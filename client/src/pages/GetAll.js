import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import NavBar from "../components/NavBar";
import { FaFileImage, FaFilePdf, FaFileAlt } from "react-icons/fa"; // Import icons

export default function GetAll() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [data, setData] = useState([]);

  const getdata = async () => {
    let dataArray;
    try {
      dataArray = await contract.display(account); // Fetch data from the smart contract
    } catch (e) {
      console.error("You don't have access", e);
      return;
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str_array);
      
      const fileData = str_array.map((item) => {
        return {
          fileLink: `${item.substring(6)}`, // Adjust this based on how your file URL is stored
        };
      });

      setData(fileData); // Set the dynamically fetched file data
    } else {
      alert("No files to display");
    }
  };

  // Get the file extension for each file and return the corresponding icon
  const getFileIcon = (fileLink) => {
    const fileExtension = fileLink.split('.').pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(fileExtension)) {
      return <FaFileImage className="text-blue-500" size={24} />;
    } else if (fileExtension === "pdf") {
      return <FaFilePdf className="text-red-500" size={24} />;
    } else {
      return <FaFileAlt className="text-gray-500" size={24} />;
    }
  };

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your contract address

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  useEffect(() => {
    if (contract) {
      getdata(); // Fetch file data once contract is set
    }
  }, [contract]);

  return (
    <>
      <NavBar />
      <br />
      <div className="p-4">
        <ul className="space-y-4">
          {data.map(({ fileLink }, index) => (
            <li key={index} className="flex items-center space-x-4 border-b pb-2">
              {getFileIcon(fileLink)}
              <a
                href={fileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {fileLink.split('/').pop()} {/* Display the file name */}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

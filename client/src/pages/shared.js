import NavBar from "../components/NavBar";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import * as React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { FaFileImage, FaFilePdf, FaFileAlt, FaShareAlt } from "react-icons/fa";

export default function Shared() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [data, setData] = useState([]);

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
      return;
    }

    if (dataArray && dataArray.length > 0) {
      const str_array = dataArray.toString().split(",");
      const fileData = str_array.map((item) => ({
        fileLink: `${item.substring(6)}`,
      }));

      setData(fileData); // Set the dynamically fetched file data
    } else {
      alert("No files to display");
    }
  };

  const getFileIcon = (fileLink) => {
    const fileExtension = fileLink.split(".").pop().toLowerCase();
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

        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mx-auto flex flex-col items-center mt-10 p-6 border border-gray-300 rounded-lg shadow-lg max-w-md">
        <h2 className="text-lg font-semibold mb-4">Enter Address:</h2>
        <input
          type="text"
          placeholder="Enter Address"
          className="address p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          className="center mt-2 button bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={getdata}
        >
          Get Data
        </button>
      </div>
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
                {fileLink.split("/").pop()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

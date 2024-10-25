import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

import NavBar from "../components/NavBar";

export default function GetImage() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const getdata = async () => {
    let dataArray;
    try {
      dataArray = await contract.display(account);
    } catch (e) {
      console.error("You don't have access", e);
      return;
    }

    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");

      const imageData = str_array.map((item) => {
        return {
          imageLink: `${item.substring(6)}`,
        };
      });

      setData(imageData);
    } else {
      alert("No image to display");
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
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  useEffect(() => {
    getdata();
  }, [contract]);
  return (
    <>
      <NavBar />
      <br />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map(({ imageLink }, index) => (
          <div key={index}>
            <a href={imageLink} target="_blank">
              <img
                className="h-50 w-full max-w-full rounded-lg object-cover object-center"
                src={imageLink}
                alt="gallery-photo"
                crossOrigin="anonymous"
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

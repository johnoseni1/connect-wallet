// import React, {Component} from 'react';
import Web3 from "web3";
import { useEffect, useState } from 'react';
import abi from '../utils/abi.json';
import '../App.css';


function Sidebar (){

    const [InputedAddress, setInputedAddress] = useState("");
    const [secondHeader, setSecondHeader] = useState('second-header')
    const [message, setMessage] = useState("Connect wallet and enter an address")
    // const [bnbBalance, setBnbBalnceMessage] = useState(0)
    
    const [contractData, setContractData] = useState({
        bnbBalance: 0,
        shibiBalance: 0,
        totalBNB: 0,
        processedIndex: 0,
        myPayOut: 0
    })
    
    const shibiminiTokenContractAddress = "0x4279946cf2e0095f01d83220ef382a67a3503201"
    const web3 = new Web3(Web3.givenProvider);
    let everShibiminiContract = new web3.eth.Contract(abi, shibiminiTokenContractAddress);
    
    const connectWallet = async () => {
        if(!window.ethereum || !window.web3) return;

        const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });

        console.log(address)
    }

    // HANDLE CHANGE WHEN ADDRESS IS PASTED INTO INPUT FEILD
    const handleChange = (e) => {

        setInputedAddress(e.target.value);

        if(!web3.utils.isAddress(e.target.value)) return;
    

       getDetailsByAddress(e.target.value);
   }




   const getDetailsByAddress = async (address) => {
    
        const bnbBal = await web3.eth.getBalance(address);
        const tikiHolding = await everShibiminiContract.methods.dividendTokenBalanceOf(address).call()
        const accountDividendInfo = await everShibiminiContract.methods.getAccountDividendsInfo(address).call()
        const totalDividendsDistributed = await everShibiminiContract.methods.getTotalDividendsDistributed().call()
        const lastProcessedIndex = await everShibiminiContract.methods.getLastProcessedIndex().call()

        setContractData({
            bnbBalance: web3.utils.fromWei(bnbBal.toString(), 'ether'),
            tikiBalance: web3.utils.fromWei(tikiHolding.toString(), 'ether'),
            totalBNB: web3.utils.fromWei(totalDividendsDistributed.toString(), 'ether'),
            processedIndex: lastProcessedIndex,
            myPayOut: accountDividendInfo[1]
        })

        setMessage(`${address} | BNB in your wallet: ${web3.utils.fromWei(bnbBal.toString(), 'ether')} ($0.00) - YOU NEED TO HOLD MORE THAN 10K TIKI TO RECEIVE DIVIDENDS`)
        setSecondHeader("second-header-2")


        console.log("tiki holding: ", tikiHolding.toString());
        console.log("bnb balance: ", bnbBal);
        console.log(" account div: ", accountDividendInfo[1].toString());
        console.log("total dividends distributed: ", totalDividendsDistributed);
        console.log("Last processed index: ", lastProcessedIndex);


   }


    
        return (
            <div>
                    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">ShibaMini</h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="">BSCscan</a>
        <a className="p-2 text-dark" href="">Solana Scan</a>
        <a className="p-2 text-dark" href="">Polygon Scan</a>
        <a className="p-2 text-dark" href="">XRPscan</a>
      </nav>
      <a className="btn btn-outline-primary" href="" onClick = {connectWallet}>Connect Wallet</a>
    </div>
    
    <div className="card" style={{marginLeft: "20px", marginRight: "20px"}}>
      <div className="card-header">
        πSHIB (BEP20) Featured Bonus
      </div>
      <div className="card-body">
        <h5 className="card-title">30Billion worth of πSHIB (BEP20) to 1000 Individuals</h5>
        <p className="card-text">We will share 30 Billion worth of BSC πSHIB to 1000 individuals who claim $500 worth of Cross-Chain tokens, While those who claim from $10 - $100 will take part in a bounty pool of $5000 Worth of the next chain we will go into.</p>
        <a href="" className="btn btn-warning">Participate In Pool</a>
      </div>
    </div>

    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 className="display-4">Autoclaim To TrustWallet</h1>
      <p className="lead">Add ShibaMini Cross-Chain to your wallet(TrustWallet, Metamask, WalletConnect, Phantom, XUMM) by claiming into your Dapp Browser.</p>
    </div>

    <div className="container">
      <div className="card-deck mb-3 text-center">
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">πSHIB (SPL)</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">Logo</h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$10 - 100,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$20 - 205,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$50 - 450,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$100 - 990,000,000πSHIB</button></li>
            </ul>
            <button type="button" className="btn btn-lg btn-block btn-outline-primary">$500 - 3000000000πSHIB</button>
          </div>
        </div>
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">πSHIB (XRP)</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">Logo</h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$10 - 100,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$20 - 205,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$50 - 450,000,000πSHIB</button></li><br />
              <li><button type="button" class="btn btn-lg btn-block btn-outline-primary">$100 - 990,000,000πSHIB</button></li>
            </ul>
            <button type="button" className="btn btn-lg btn-block btn-primary">$500 - 3000000000πSHIB</button>
          </div>
        </div>
        <div className="card mb-4 box-shadow">
          <div className="card-header">
            <h4 className="my-0 font-weight-normal">πSHIB (MATIC)</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">Logo</h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$10 - 100,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$20 - 205,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$50 - 450,000,000πSHIB</button></li><br />
              <li><button type="button" className="btn btn-lg btn-block btn-outline-primary">$100 - 990,000,000πSHIB</button></li>
            </ul>
            <button type="button" class="btn btn-lg btn-block btn-primary">$500 - 3000000000πSHIB</button>
          </div>
        </div>
      </div>

      <footer className="pt-4 my-md-5 pt-md-5 border-top">
        <div className="row">
          <div className="col-12 col-md">
            <img className="mb-2" src="../../assets/img/favicons/favicon.png" alt="" width="24" height="24" />
            <small className="d-block mb-3 text-muted">&copy; 2021 - Till Date</small>
          </div>
          <div className="col-6 col-md">
            <h5>Features</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="">Token Tipping</a></li>
              <li><a className="text-muted" href="">Memerank</a></li>
              <li><a className="text-muted" href="">HiRent</a></li>
              <li><a className="text-muted" href="">Jokes & Fun</a></li>
              <li><a className="text-muted" href="">BlockJob</a></li>
              <li><a className="text-muted" href="">FeeFund</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>Resources</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="">Resource</a></li>
              <li><a className="text-muted" href="">Resource name</a></li>
              <li><a className="text-muted" href="">Another resource</a></li>
              <li><a className="text-muted" href="">Final resource</a></li>
            </ul>
          </div>
          <div className="col-6 col-md">
            <h5>About</h5>
            <ul className="list-unstyled text-small">
              <li><a className="text-muted" href="">Team</a></li>
              <li><a className="text-muted" href="">Locations</a></li>
              <li><a className="text-muted" href="">Privacy</a></li>
              <li><a className="text-muted" href="">Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
            </div>
        );
    }
// }

export default Sidebar
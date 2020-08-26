
import MLM from "../contracts/MLM.json";
import Web3 from "web3";
export default class BlockchainManager {
    web3 = window.web3;
    static myInstance = null;
    data = {};


    static  getInstance() {
        if (BlockchainManager.myInstance == null) {
            BlockchainManager.myInstance = new BlockchainManager();
             BlockchainManager.myInstance.init();
        }

        return this.myInstance;
    }

    // async componentWillMount() {
    //     await this.loadWeb3();
    //     await this.loadBlockchainData();
    //   }

    async init() {
       await this.loadWeb3();
       await this.loadBlockchainData();
       
    }


    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    }


    async loadBlockchainData() {
        try {
            const web3 = window.web3;
            const accounts = await web3.eth.getAccounts();

            this.account =   accounts[0]
         

            // this.setState({ account: accounts[0] });
            this.data.account = this.account
            const networkId = await web3.eth.net.getId();
            const networkData = MLM.networks[networkId];
            if (networkData) {
                const mlm = new web3.eth.Contract(MLM.abi, networkData.address);
                this.data.mlm = mlm;
                this.data.contractAddress=networkData.address;
                // console.log(this.data.contractAddress);
                this.data.totalUsers=web3.utils.toBN(await mlm.methods.getTotalUsers().call()).toString();
                // console.log(this.data.totalUsers)
                this.data.rewardWallet=web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getRewardWallet().call()), "ether");
                this.data.totalAmountWithdrawn= web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getTotalAmountWithdrawn().call()), "ether");

                // // this.setState({ mlm });
                // this.setState({
                //     contractAddress: networkData.address,
                //     totalUsers: web3.utils.toBN(await mlm.methods.getTotalUsers().call()).toString(),
                //     rewardWallet: web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getRewardWallet().call()), "ether"),
                //     totalAmountWithdrawn: web3.utils.fromWei(web3.utils.toBN(await mlm.methods.getTotalAmountWithdrawn().call()), "ether"),
                // });

            } else {
                window.alert(
                    "MLM contract not deployed to detected network."
                );
            }
        }
        catch (e) {
            console.log(e);
            console.log("you have an error");
        }
    }



    async  getUserBlockChainDetails(callback){


        if(!this.data){
            callback({})
            return
        }
            console.log(this.data)
        // console.log("conadd",this.data.contractAddress,"wallet",this.data.account)
        callback({
            contractAddress:this.data.contractAddress,
            ethereumWallet:this.data.account
        })
     
    }






    //Register
    // async register(id, price,callback) {
    //     // this.setState({ loading: true });
    //     this.data.mlm.methods.register(id).send({ from: this.data.account, value: price })
    //         .once('receipt', (receipt) => {
    //             callback(receipt)
    //             // this.setState({ loading: false })
    //         })
    // }

    // //Buy level
    // async buyLevel(level, price,callback) {
    //     // this.setState({ loading: true });
    //     this.data.mlm.methods.buyLevel(level).send({ from: this.data.account, value: price })
    //         .once('receipt', (receipt) => {
    //             // this.setState({ loading: false })
    //             callback(receipt)
    //         })
    // }

    // //auto buylevel
    // async autoBuyLevel(callback) {
    //     // this.setState({ loading: true });
    //     this.data.mlm.methods.autoBuyLevel().send({ from: this.data.account })
    //         .once('receipt', (receipt) => {
    //             // this.setState({ loading: false })
    //             callback(receipt)
    //         })
    // }

    // //withdraw autobuy level wallet
    // async withDrawAutobuyWalletAmount(callback) {
    //     // this.setState({ loading: true });
    //     this.data.mlm.methods.withDrawAutobuyWalletAmount().send({ from: this.data.account })
    //         .once('receipt', (receipt) => {
    //             // this.setState({ loading: false })
    //             callback(receipt)

    //         })
    // }

    // //distribute rewards
    // async giveRewards(callback) {
    //     // this.setState({ loading: true });
    //     this.data.mlm.methods.giveRewards().send({ from: this.data.account })
    //         .once('receipt', (receipt) => {
    //             // this.setState({ loading: false })
    //             callback(receipt)

    //         })
    // }

    // //retopup or recycle id
    // async recycle(id1, id2, id3,callback) {
    //     // this.setState({ loading: true });
    //     this.data.mlm.methods.recycle(id1, id2, id3).send({ from: this.data.account })
    //         .once('receipt', (receipt) => {
    //             // this.setState({ loading: false })
    //             callback(receipt)

    //         })
    // }
   
   
   
    // async getUser(referalId,callback) {


    //     this.data.mlm.methods.getUserInfo(referalId).call().then( (User)=> {
    //         this.data.user={
    //             inviter: User[0],
    //             totalReferrals: User[1],
    //             dailyReferrals: User[2],
    //             levelsPurchased: User[3]
    //         }
    //         callback(false,this.data.user)
    //     })
    //         .catch(function (err) {
    //             console.error("problem getting user", err);
    //             callback(true,err)
    //         });
    // }

    async getUsersIncomes(referalId,callback) {



        const web3 = window.web3;
        this.data.mlm.methods.getUsersIncomes(referalId).call().then((user)=> {
            // console.log(user);
            var di = user.directIncome;
            var ri = user.recycleIncome;
            var li= user.levelIncome;
            // var rewi = user.rewardIncome;
            var rf = user.recycleFund;
            // var lf = user.levelFund;
            var income={
                
                directIncome: web3.utils.fromWei(di.toString(), "ether"),
                recycleIncome: web3.utils.fromWei(ri.toString(), "ether"),
                levelIncome: web3.utils.fromWei(li.toString(),"ether"),
                // rewardIncome : web3.utils.fromWei(rewi.toString(),"ether"),
                recycleFund: web3.utils.fromWei(rf.toString(),"ether"),
                // levelFund: web3.utils.fromWei(lf.toString(),"ether")
            };
            // this.data.user.income=income
            callback(false,income);
        })
            .catch(function (err) {
                console.error("problem getting user", err);
                callback(true,err);
            });
    }


}
import MUIDataTable from "mui-datatables";
import React, { Component } from "react";
import { firebase } from '../firebaseConfig';
import { message } from "antd";

const db = firebase.firestore();
const success = () => {
    message.success("Product Successfully Deleted");
};
const error1 = () => {
    message.error("Error in Deleting");
};

const columns = [
    {
        name: "phone",
        label: "Phone",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "address",
        label: "Address",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "date",
        label: "Date",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "product",
        label: "Product",
        options: {
            filter: true,
            sort: false,

        }
    },
    {
        name: "price",
        label: "Price /hr",
        options: {
            filter: true,
            sort: false,

        }
    },


];



class Rentals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            selectedItems: []
        };
    }
    options = {
        filterType: 'checkbox',
        responsive: "scroll",
        onRowsDelete: (rowsDeleted) => {
            for (var key in rowsDeleted.data) {
                var doc = db.collection("RentOrder").where("CurTime", "==", (this.state.Data[rowsDeleted.data[key].dataIndex]).CurTime);
                doc.get().then((qsnap) => {
                    qsnap.forEach((doci) => {
                        doci.ref.delete().then(() => {
                            success();
                        }).catch(error => {
                            error1();
                            console.log(error);
                        });
                    })
                })
            }
        }
    };
    componentDidMount() {
        db.collection("RentOrder")
            .get()
            .then(querySnapshot => {
                const sdata = querySnapshot.docs.map(doc => doc.data());
                const Matches = [];
                sdata.forEach((e) => {
                    Matches.push(e);
                });
                this.setState({
                    Data: Matches
                })
            });
    }
    render() {
        return (
            <div>
                <MUIDataTable
                    title={"Active Orders"}
                    data={this.state.Data}
                    columns={columns}
                    options={this.options}
                />

            </div>

        );
    }

}
export default Rentals;




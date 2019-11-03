import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import SearchField from "react-search-field";
import axios from "axios";
import { relative } from "path";
import Dropdown from "react-dropdown";
import { hostedAddress } from "../../GlobalVar";

let doneSearchFlag = false,
    searchVal = null;
//create the Landing Component
class HomeMentor extends Component {
    constructor(props) {
        super(props);
        this.state = { searchResponse: [], searchVal: "" };
    }
    searchChangeHandler = e => {
        this.setState({
            searchVal: e.target.value
        });
    };
    // searchFunction = () => {
    //   // console.log(this.search.state.value);
    //   searchVal = this.search.state.value;
    //   let data = { search: searchVal };
    //   axios.defaults.withCredentials = true; //very imp, sets credentials so that backend can load cookies
    //   axios.post(hostedAddress + ":3001/search", data).then(response => {
    //     this.setState({ searchResponse: response.data });
    //     // console.log(doneSearchFlag);
    //   });
    //   doneSearchFlag = true;
    // };

    render() {
        let redirectVar = <Redirect to="/home_cust" />;
        let redirectSearchResult = null;
        if (doneSearchFlag) {
            console.log(this.state.searchResponse);
            doneSearchFlag = false;

        } else {
            redirectSearchResult = null;
        }
        //if Cookie is set render Logout Button
        if (cookie.load("cookie") != "customer") {
            redirectVar = <Redirect to="/login" />;
        }
        return (
            <div
    class="maincust"
        style={{ textAlign: "center", width: "200", height: "200" }}
    >
        {redirectVar}
        {redirectSearchResult}
    <h1 class="h1" style={{ textAlign: "center" }}>
        Hello {cookie.load("name")}! Hungry?{" "}
            <span style={{ fontSize: 40 }}>&#127827;</span>
        </h1>

        <div class="">
            <div class="">
            {/* <SearchField
                ref={ref => (this.search = ref)}
                placeholder="Search Food..."
                onSearchClick={this.searchFunction}
                classNames="test-class"/> */}
            <input
        type="text"
        onChange={this.searchChangeHandler}
        placeholder="Type your favourite food..."
    class="test-class1"
            />
            </div>
            </div>
            </div>
    );
    }
}

export default HomeMentor;

/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import UserDetail from "./UserDetails";
import API from "../utils/API";


function MainContainer() {
    const [resultUsers, setResultUsers] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(function () {
        searchUsers()
    }, []) // empty set of variables
    async function searchUsers() {
        const res = await API.getUsers()
        setResultUsers(res.data.results)
    }

    async function handleInputChange(event) {
        await setSearch(event.target.value)
    }

    //handle button click
    async function handleFormSubmit(event) {
        event.preventDefault()
        let res = resultUsers.filter(function (el) {
            if ((el.name.first).toLowerCase().indexOf((search).toLowerCase()) !== -1) {
                return el;
            }
        })
        setResultUsers(res)
        console.log('results', res)
    }

    async function handleFormSort(event) {
        event.preventDefault()
        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            console.log("sort all", a.name.first, b.name.first)
            const personA = a.name.first.toUpperCase();
            const personB = b.name.first.toUpperCase();

            let comparison = 0;
            if (personA > personB) {
                comparison = 1;
            } else if (personA < personB) {
                comparison = -1;
            }
            return comparison;
        }
        let res = resultUsers.sort(compare)
        setResultUsers([...res])
        console.log("sort result", resultUsers)

    }


    return (
        <Container>
            <Row>
                <Col size="md-12">
                    <Card heading="Fallon Software Inc">
                        <SearchForm
                            value={search}
                            handleInputChange={handleInputChange}
                            handleFormSubmit={handleFormSubmit}
                            handleFormSort={handleFormSort}
                        />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col size="md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Picture</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultUsers.map(user => (
                                <UserDetail
                                    picture={user.picture.thumbnail}
                                    firstname={user.name.first}
                                    lastname={user.name.last}
                                    email={user.email}
                                />
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    );
}
export default MainContainer;
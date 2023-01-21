import React, { Component } from 'react'
import NoticeItem from './NoticeItem'
import './Notice.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';
export class Notice extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        var url;
        this.setState({ loading: true });
        await axios.get('http://localhost:9000/api/auth/getAllNoticeDetails')
            .then(function (response) {
                console.log("i have signed in get Notice details");
                url = response.data.response.result;
            })
            .catch(function (error) {
                toast.error("Error in getting Notice");
            });
            url.reverse();
        this.setState({ loading: false });
        this.setState({ articles: url});
        //  console.log(articles);
        //     totalResults: parsedData.totalResults,
        //     loading: false})
    }
    render() {
        return (
            <div className="list" >
            <Sidebar/>
            <div className="listContainer">
                <Navbar/>
            <div class="Notice">
            <div className="container my-3">
            <h1 className="text-center">NOTICE</h1>
            {/* {this.state.loading} */}
            {this.state.loading && <Spinner/>}
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element._id}>
                            <NoticeItem title={element.Title.slice(0,50)} description={element.Description.slice(0,100)} NoticeUrl={element.url} author={element.Author_Name[0].toUpperCase()+element.Author_Name.slice(1)} date={element.createdAt} />
                            <NoticeItem title={element.Title.slice(0,50)} description={element.Description.slice(0,100)} NoticeUrl={element.url} author={element.Author_Name[0].toUpperCase()+element.Author_Name.slice(1)}  date={element.createdAt} />
                            <NoticeItem title={element.Title.slice(0,50)} description={element.Description.slice(0,100)} NoticeUrl={element.url} author={element.Author_Name[0].toUpperCase()+element.Author_Name.slice(1)}  date={element.createdAt} />
                        </div>
                    })}
                </div>
            </div>
            </div>
            </div>
            </div>
            
        )
    }
}

export default Notice
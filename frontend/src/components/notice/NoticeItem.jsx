import React, { Component } from 'react'
import './Notice.scss'
export class NoticeItem extends Component {
    render() {
        let {title, description, NoticeUrl,author,date} = this.props;
        return (
            <div className="Notice">
            <div className="my-3">
                <div className="card">
                <img src={"https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}....</p>
                        <p className="card-text"><small class="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={NoticeUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default NoticeItem
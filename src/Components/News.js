import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=abbf88455de3472bbd28d76916ccd9af&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        props.setProgress(30);
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {   
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=abbf88455de3472bbd28d76916ccd9af&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage}  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News


// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";

// export class News extends Component {
// static defaultProps ={
//     pageSize: 6,
//     country: 'in',
//     category: 'genral'
// }
// static propTypes ={
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
// }

// capitalizeFirstLetter=(string)=>{
//     return string.charAt(0).toUpperCase() +string.slice(1);
// }

//     constructor(props) {
//         super(props);
//         this.state = {
//             articles: [],
//             loading: false,
//             page: 1 ,
//             totalResults: 0

//         }; 
//         document.title=`${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`;
//     }

//     async componentDidMount(){
//         this.props.setProgress(10);
//         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=abbf88455de3472bbd28d76916ccd9af&page=1&pageSize=${this.props.pageSize}`
//         this.props.setProgress(40);
//         let data= await fetch(url)
//         let parsedata= await data.json()
//         this.props.setProgress(70);
//         this.setState({articles: parsedata.articles})
//         this.props.setProgress(100);

//     }
//     handlePrevClick=async()=>{
//     //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=abbf88455de3472bbd28d76916ccd9af&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
//     //     let data= await fetch(url)
//     //     let parsedata= await data.json()
//     //     this.setState({
//     //         page: this.state.page- 1,
//     //         articles: parsedata.articles,
//     //         totalResults: parsedata.totalResults
//         // })

//     }
//     handleNextClick=async()=>{
//     //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=abbf88455de3472bbd28d76916ccd9af&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
//     //     let data= await fetch(url)
//     //     let parsedata= await data.json()
//     //     this.setState({
//     //         page: this.state.page+1,
//     //         articles: parsedata.articles,
//     //         totalResults: parsedata.totalResults
//         // })

//     }
//     fetchMoreData = async() => {
//         this.props.setProgress(0);
//         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=abbf88455de3472bbd28d76916ccd9af&page=${this.props.page+1}&pageSize=${this.props.pageSize}`
//         this.setState({ page: this.state.page+1});
//         this.setState({loading:true});
//         let data= await fetch(url)
//         let parsedata= await data.json()
//         this.setState({
//             articles: this.state.articles.concat(parsedata.articles),
//             totalResults: parsedata.totalResults,
//             loading:false
//         })
//         this.props.setProgress(100);
//       };
 
//     render() {
//         return (
//             <>
//                 <h1 className="text-center" style={{margin: '35px',  marginTop: '90px'}}>NewsMonkey -Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
//                 {/* <Spinner/> */}
//                 <InfiniteScroll
//                 dataLength={this.state.articles.length}
//                 next={this.fetchMoreData}
//                 hasMore={this.state.articles.length!== this.state.totalResults}
//                 loader={<h4>Loading...</h4>}>
//                 <div className="container">
//                 <div className="row">
//                 {this.state.articles.map( (element) => {
//                    return  <div className="col-md-4" key={element.url}>
//                         <NewsItem title={element.title?element.title:""} description={element.description?element.description: ""} imgUrl={element.urlToImage}  newsUrl={element.url} author= {element.author}  date= {element.publishedAt}  source={element.source.name} />
//                     </div>
//                 })} 
//                 </div>
//                 </div>
//                 </InfiniteScroll>
                  
//             </>
//         );
//     }
// }

// export default News;
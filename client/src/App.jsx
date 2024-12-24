import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const App = () => {
    const [post, setPost] = useState([]);
    const [currentPage, setCurrentPage] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            let res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await res.json();
            setPost(data);
            setPageCount(Math.ceil(data.length / itemsPerPage));
            setCurrentPage(data.slice(0, itemsPerPage));
        })();
    }, []);

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage*itemsPerPage;
        const newPageData = post.slice(offset, offset + itemsPerPage )
        setCurrentPage(newPageData);
    }


    return (
        <div className="container mt-4">
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentPage?.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
                <div className="d-flex justify-content-center">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next >"}
                        breakLabel={".."}
                        onPageChange={handlePageClick}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        renderOnZeroPageCount={null}
                        containerClassName={"pagination justify-content-center"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        previousLinkClassName={"page-link"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        disabledClassName={"disabled"}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;

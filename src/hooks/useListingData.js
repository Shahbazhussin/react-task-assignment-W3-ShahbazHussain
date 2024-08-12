import { useState, useEffect } from "react";
import axios from "axios";

const useListingData = (initialPage = 1) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(() => {
        const savedPage = localStorage.getItem("currentPage");
        return savedPage ? parseInt(savedPage, 10) : initialPage;
    });
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        //Fetching data from API using axions
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log("Fetching data for page:", currentPage);
                const response = await axios.get(
                    `https://swapi.dev/api/people?page=${currentPage}`
                );

                console.log("API Response:", response.data);

                const results = response.data.results || [];
                setData(results);

                setTotalPages(Math.ceil(response.data.count / 10));
                setError("");
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    //Pagination 
    useEffect(() => {
        localStorage.setItem("currentPage", currentPage);
    }, [currentPage]);

    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return { loading, data, error, currentPage, totalPages, nextPage, prevPage };
};

export default useListingData;

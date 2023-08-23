// context  creation ✅
// provider ✅
// consumer lenghty remove useContext hook
// useContext hook ✅

import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

let API = "https://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading: true,
    query: "",
    nbPages: 0,
    page: 0,
    hits: [],
};

const AppContext = React.createContext();

// to create a provider fucntion
const AppProvider = ({ children }) => {
    // const [state, setstate] = useState(initialState);

    const [state, dispatch] = useReducer(reducer, initialState);

    const fecthApiData = async (url) => {
        dispatch({ type: "SET_LOADING" });

        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                },
            });
            // isLoading = false;
        } catch (error) {
            console.log(error);
        }
    };

    // to remove the post
    const removePost = (post_ID) => {
        dispatch({ type: "REMOVE_POST", payload: post_ID });
    };


    // search
    const searchPost = (searchQuery) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: searchQuery,
            // can write any value instade of payload but send that value to reducer with same name
        });
    };

    // pagination
    const getNextPage = () => {
        dispatch({
            type: "NEXT_PAGE",
        });
    };

    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
        });
    };

    // to call the api func
    useEffect(() => {
        fecthApiData(`${API}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page]);
    // paste the  state.query to reload content after every reload
    // state.page is use to get the page reload and get new news every page change

    return (
        <AppContext.Provider
            value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}>
            {children}
        </AppContext.Provider>
    );
};

// custom hook chitsreate
const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
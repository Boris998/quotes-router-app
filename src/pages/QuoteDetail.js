import {Link, Route, useParams, useRouteMatch} from "react-router-dom";
import {Fragment, useEffect} from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const asd = [
    {
        id: 'q1',
        author: 'Nelson Mandela',
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.'
    },
    {
        id: 'q2',
        author: 'Steve Jobs',
        text: 'Your time is limited, so don\'t waste it living someone else\'s life. Don\'t be trapped by dogma – which is living with the results of other people\'s thinking.'
    },
    {id: 'q3', author: 'John Lennon', text: 'Life is what happens when you\'re busy making other plans.'},
];

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();

    const {quoteId} = params;

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status==='pending') {
        return <div className='centered'>
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <p className='centered'>{error}</p>
    }

    if (!loadedQuote.text){
        return <NoQuotesFound/>;
    }


    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>
                        Load Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments></Comments>
            </Route>
        </Fragment>
    );
}

export default QuoteDetail;

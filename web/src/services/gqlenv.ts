import axios from 'axios';
import {
    Environment,
    FetchFunction,
    Network,
    RecordSource,
    Store,
} from 'relay-runtime';

const fetchQuery: FetchFunction = (
    operation,
    variables,
) => {
    return axios.post('http://localhost:3040/graphql',
        JSON.stringify({
            query: operation.text,
            variables,
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
            // withCredentials: true
        }
    ).then(response => {
        return response.data;
    });
}

const environment = new Environment({
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource()),
});

export default environment;

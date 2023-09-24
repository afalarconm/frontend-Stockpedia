
const TokenFetcher = async (getAccessTokenSilently) => {
    try {
        const fetchedToken = await getAccessTokenSilently({
            audience: `https://stockpedia-api`,
            scope: 'read:current_user',
        });

        const token = fetchedToken;
        console.log('token', token)
        return token;
    } catch (error) {
        console.error(error);
        return null;
    }
};


export { TokenFetcher };


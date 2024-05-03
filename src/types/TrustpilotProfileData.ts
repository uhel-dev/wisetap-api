export interface TrustpilotProfile {
    displayName?: string,
    identifyingName?: string,
    numberOfReviews?: string,
    trustScore?: string,
    websiteUrl?: string,
    stars?: string,
    starsUrl?: string,
    profileImageUrl?: string
}

export interface TrustpilotBusinessUnit {
    displayName?: string;
    identifyingName?: string;
    numberOfReviews?: string;
    trustScore?: string;
    websiteUrl?: string;
    stars?: string;
    profileImageUrl?: string;
}
export interface TrustpilotBusinessUnitResponse {
    props: {
        pageProps: {
            businessUnit: TrustpilotBusinessUnit
        }
    }
}
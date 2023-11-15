export const storeToken = ({
    headers,
    setSignedIn,
}: {
    headers: Headers,
    setSignedIn: (signedIn: any) => void,
}) => {
    const auth = headers!.get("Authorization");
    const token = auth!.substring(7, auth!.length);    
    sessionStorage.setItem("token", token);
    setSignedIn(true);
}
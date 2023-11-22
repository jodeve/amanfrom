export const storeToken = ({
    headers,
    setCurrentUser,
    body,
}: {
    headers: Headers,
    setCurrentUser: (body: any) => void,
    body: any,
}) => {
    const auth = headers!.get("Authorization");
    const token = auth!.substring(7, auth!.length);    
    sessionStorage.setItem("token", token);
    setCurrentUser(body);
}
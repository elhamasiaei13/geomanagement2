

const authUtil = {
    isAuthenticated: () => {
        let expiresAt = JSON.parse(localStorage.getItem("expiresAt"));
        return new Date().getTime() < expiresAt;
    },
    logout: () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("expiresAt");
        window.location = `${process.env.REACT_APP_UAA_PROTOCOL}://${process.env.REACT_APP_UAA_BASE_URL}${process.env.REACT_APP_UAA_PORT}/uaa/logout.do?redirect=http://${process.env.REACT_APP_REPORT_BACKEND_FE_BASE_URL}${process.env.REACT_APP_REPORT_BACKEND_FE_PORT}/login&client_id=app`
    },
    isRedirectedBackFromAuthServer: (location) => {
        return location.hash;
    },

    isAuthorizedByAuthServer: (location) => {
        let params = new URLSearchParams(location.hash.substr(1));
        const state = params.get("state");
        const accessToken = params.get("access_token");
        const expiresAt = params.get("expires_in") * 1000 + new Date().getTime();

        return accessToken && expiresAt && state && state == localStorage.getItem("stateStr");
    },

    persistAuthCredential: (location) => {
        let params = new URLSearchParams(location.hash.substr(1));
        const accessToken = params.get("access_token");
        const expiresAt = params.get("expires_in") * 1000 + new Date().getTime();
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("expiresAt", expiresAt);
    },

    redirectToPreLocation: () => {
        const preLocation = JSON.parse(localStorage.getItem("previousLocation"));
        localStorage.removeItem("previousLocation");
        window.location = `${preLocation.pathname}`;
    },

    redirectToLoginErrorPage: () => {
        window.location = "/loginfailed";
    },

    redirectToAuthServer: (location) => {
        localStorage.setItem("previousLocation", JSON.stringify(location));
        const stateStr = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("stateStr", stateStr);

        window.location = `${process.env.REACT_APP_UAA_PROTOCOL}://${process.env.REACT_APP_UAA_BASE_URL}${process.env.REACT_APP_UAA_PORT}/uaa/oauth/authorize?client_id=app&response_type=token&state=${stateStr}&redirect_uri=http://${process.env.REACT_APP_REPORT_BACKEND_FE_BASE_URL}${process.env.REACT_APP_REPORT_BACKEND_FE_PORT}/login`;
    },

    parseJwt: (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
}


export default authUtil;
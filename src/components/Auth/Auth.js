const Auth = () => {
  const sessionInfo = localStorage.getItem('session_info');
  const parseSessionInfo = JSON.parse(sessionInfo);

  if (parseSessionInfo && parseSessionInfo.token && parseSessionInfo.user) {
    return {
      accessToken: parseSessionInfo.token.accessToken,
      user: parseSessionInfo.user
    }
  }
}

export default Auth;
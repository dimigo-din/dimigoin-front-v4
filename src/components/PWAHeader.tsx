const PWAHeader = () => {
    return (
        <>
            <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/dimigoin.png"/>
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-title" content="디미고인"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
        </>
    );
}
export default PWAHeader;
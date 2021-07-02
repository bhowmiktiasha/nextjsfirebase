import '../styles/globals.css';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import Loading from './Loading';

// import PullToRefresh from 'react-simple-pull-to-refresh';
// import { PullToRefresh } from 'react-js-pull-to-refresh';
// import { PullDownContent, ReleaseContent, RefreshContent } from 'react-js-pull-to-refresh';

function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null);
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) setUser(user);
			else setUser(null);
		});
	}, []);

	// const handleRefresh = () =>{

	// };

	//   const handleRefresh =(resolve, reject) => {

	//     let success = false;
	//     if (success) {
	//         resolve();
	//     } else {
	//         reject();
	//     }
	// }

	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setisLoading(false);
		}, 2500);
	});

	return (
		<>
			{/* <PullToRefresh onRefresh={handleRefresh} canFetchMore={true}> */}
			{/* <PullToRefresh
				pullDownContent={<PullDownContent />}
				releaseContent={<ReleaseContent />}
				refreshContent={<RefreshContent />}
				pullDownThreshold={200}
				 onRefresh={handleRefresh}
				triggerHeight={50}
				backgroundColor="white"
				startInvisible={true}
			> */}

			{isLoading ? (
				<Loading />
			) : (
				<div
					style={{
						backgroundImage:
							'url(https://c3.staticflickr.com/3/2949/15368049016_06702108d3_b.jpg),linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8))',
						width: '100%',
						backgroundPosition: 'center',
						backgroundBlendMode: 'overlay',
						backgroundSize: 'cover',
						position: 'absolute',
					}}
				>
					<Head style={{ background: 'black' }}>
						<link
							rel="stylesheet"
							href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
						/>
						<script
							defer
							src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"
						></script>
					</Head>
					<NavBar user={user} />
					<Component {...pageProps} user={user} />
				</div>
			)}
			{/* </PullToRefresh> */}
			{/* </PullToRefresh> */}
		</>
	);
}

export default MyApp;

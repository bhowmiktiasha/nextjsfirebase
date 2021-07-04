import { db } from '../firebase';
import Link from 'next/link';
import { useState } from 'react';
import Router from 'next/router';
// import Body from '../components/Body'

export default function Home({ Allblogs, user, name }) {
	const [blogs, setblogs] = useState(Allblogs);
	const [end, setEnd] = useState(false);
	const loadMore = async () => {
		const last = blogs[blogs.length - 1];
		const res = await db
			.collection('blogs')
			.orderBy('createdAt', 'desc')
			.startAfter(new Date(last.createdAt))
			.limit(3)
			.get();
		const newblogs = res.docs.map((docSnap) => {
			return {
				...docSnap.data(),
				createdAt: docSnap.data().createdAt.toMillis(),
				id: docSnap.id,
			};
		});
		setblogs(blogs.concat(newblogs));

		if (newblogs.length < 3) {
			setEnd(true);
		}
	};

	return (
		<>
			<div className="center">
				{user ? (
					<div style={{ display: 'inline-flex' }}>
						<h3
							style={{
								marginTop: '40px',
								marginBottom: '30px',
								fontWeight: '500',
								color: 'greenyellow',
								fontSize: '35px',
							}}
						>
							Articles
						</h3>

						<img
							src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/blue_webpict30_1484337148-1.png"
							style={{
								width: '45px',
								height: '41px',
								marginBlock: 'auto',
								marginLeft: '5%',
								marginTop: '25%',
							}}
							onClick={() => Router.reload('/')}
							alt="pic"
						/>
					</div>
				) : (
					<h3
						style={{
							marginTop: '40px',
							marginBottom: '30px',
							fontWeight: '500',
							color: 'greenyellow',
							fontSize: '35px',
						}}
					>
						Articles
					</h3>
				)}

				{blogs.map((blog) => {
					return (
						<>
							<h3
								className="thing"
								style={{
									color: 'white',
								}}
							>
								{blog.title}
							</h3>

							<h3 className="there" style={{ fontSize: '14px', color: 'white' }}>
								Posted by{' '}
								<span style={{ fontSize: '14px', fontWeight: '500', color: 'greenyellow' }}>
									{blog.personname}
								</span>{' '}
								on{' '}
								<span style={{ fontSize: '14px', fontWeight: '500', color: 'greenyellow' }}>
									{' '}
									{new Date(blog.createdAt).toDateString()}
								</span>
							</h3>
							<div className="card" key={blog.createdAt}>
								<div className="card-image">
									<img src={blog.imageUrl} />
								</div>
								<div className="card-content">
									<p style={{ fontWeight: '400', fontSize: '18px' }}>{blog.body}</p>
								</div>
								<div
									className="card-action"
									style={{ textAlign: 'center', borderTop: '2px solid lightgrey' }}
								>
									<Link href={`/blogs/${blog.id}`}>
										<a style={{ color: 'darkgreen', fontWeight: '600', marginRight: 'auto' }}>
											Read More{' '}
										</a>
									</Link>
								</div>
							</div>
						</>
					);
				})}

				{end == false ? (
					<button
						className="btn #fb8c00 orange darken-1"
						style={{ marginBottom: '20px' }}
						onClick={() => loadMore()}
					>
						Load more
					</button>
				) : (
					<h3 style={{ fontSize: 'larger', color: 'white' }}>You have reached end</h3>
				)}

				<style jsx>
					{`
            .card{
              max-width:350px;
              margin:22px auto;
              border: 2px solid azure;
            }
            p{
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }

            .thing {
              text-align: center;
           }
           @media (max-width: 768px) {
             .thing {
              text-align: left;
              margin-left: 12px;
              font-size: xx-large;
              word-break: break-word;
             }

             .there {
              text-align: center;
           }
           @media (max-width: 768px) {
             .there {
              text-align: left;
              margin-left: 12px;
              font-size: 14px;
              word-break: break-word;
             }
           

           `}
				</style>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	const querySnap = await db.collection('blogs').orderBy('createdAt', 'desc').limit(3).get();
	const Allblogs = querySnap.docs.map((docSnap) => {
		return {
			...docSnap.data(),
			createdAt: docSnap.data().createdAt.toMillis(),
			id: docSnap.id,
		};
	});

	return {
		props: { Allblogs }, // will be passed to the page component as props
	};
}

import { Preview } from '@/ui/Preview';
import {
	createHashRouter,
	createRoutesFromElements,
	Link,
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { StrictMode, useEffect } from 'react';
import { NewSession } from '@/ui/screens/NewSession';
import { ViewSession } from '@/ui/screens/ViewSession';
import { Home } from '@/ui/screens/Home';
import { AppData } from '@/storage/AppData';

function createRouter() {
	let initialScreen = AppData.currentPath() ?? 'home';
	if ( initialScreen === '/' ) {
		initialScreen = 'home';
	}

	return createHashRouter(
		createRoutesFromElements(
			<Route path="/" element={ <App /> }>
				<Route
					index
					element={ <Navigate to={ initialScreen } replace /> }
				/>
				<Route path="home" element={ <Home /> } />
				<Route path="new-session" element={ <NewSession /> } />
				<Route path="view-session" element={ <ViewSession /> } />
			</Route>
		)
	);
}

function App() {
	const location = useLocation();
	useEffect( () => {
		AppData.setCurrentPath( location.pathname );
	}, [ location ] );

	return (
		<>
			<div className="app">
				<Navbar className={ 'app-nav' } />
				<div className="app-main">
					<Outlet />
				</div>
			</div>
			<div className="preview">
				<Preview />
			</div>
		</>
	);
}

function Navbar( props: { className: string } ) {
	const { className } = props;
	const navigate = useNavigate();

	return (
		<nav className={ className }>
			<ul>
				<button onClick={ () => navigate( '/home' ) }>Home</button>
			</ul>
		</nav>
	);
}

export function createApp() {
	return (
		<StrictMode>
			<RouterProvider router={ createRouter() } />
		</StrictMode>
	);
}

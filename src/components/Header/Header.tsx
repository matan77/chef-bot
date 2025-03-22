import chefClaudeLogo from '../../assets/logo.png'
import "./style.css";

const Header = () => {
	return (
		<header>
			<img src={chefClaudeLogo} />
			<h1>Chef Claude</h1>
		</header>
	);
};

export { Header };

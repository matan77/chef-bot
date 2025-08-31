import chefLogo from '../../assets/logo.png'
import "./style.css";

const Header = () => {
	return (
		<header>
			<img src={chefLogo} />
			<h1>Chef Llama</h1>
		</header>
	);
};

export { Header };

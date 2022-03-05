import styles from '../styles/NavBar.module.css'
import Link from 'next/link'

export default function NavBar() {
	return (
		<div className={styles.iconsContainer}>
			<div>
				<Link href="https://www.bistro.sk/restauracia/pizzeria-rotunda/">
					<img src="https://play-lh.googleusercontent.com/HxhSzkrR35dpwnoKeOfNl14zx-Grp49HIRpVfrSAg0oM82Ndv2-xb-x9O6hFlC5dzN4"/>
				</Link>
				<Link href="https://www.facebook.com/pizzeriarotundabratislava/">
					<img src="https://dexibell.com/app/uploads/2018/05/facebook-logo.png"/>
				</Link>
			</div>
		</div>
	)
}


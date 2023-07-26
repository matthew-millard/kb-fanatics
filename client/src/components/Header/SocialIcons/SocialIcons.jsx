import socialIcons from './socialIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SocialIcons.module.css';

function SocialIcons() {
  return (
    <div className={styles.socialIcons}>
      {socialIcons.map((iconObj, index) => {
        return (
          <a key={index} href={iconObj.url} className={iconObj.className}>
            <FontAwesomeIcon icon={iconObj.icon} />
          </a>
        );
      })}
    </div>
  );
}

export default SocialIcons;

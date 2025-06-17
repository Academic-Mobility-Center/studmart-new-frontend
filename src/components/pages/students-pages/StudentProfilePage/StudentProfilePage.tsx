import { FC } from 'react';

import { IStudentProfilePageProps } from './IStudentProfilePageProps';
import styles from './StudentProfilePage.module.scss';

const StudentProfilePage: FC<IStudentProfilePageProps> = (props) => {
	return (
		<div className={`${styles.studentProfilePage}`}>
			<h3>StudentProfilePage Stateless Component!</h3>
		</div>
	);
};

export default StudentProfilePage;

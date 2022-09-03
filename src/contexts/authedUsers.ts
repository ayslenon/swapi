import { userType } from './authProvider';

export const users: userType[] = [
	{
		login: {
			email: 'fulaniho@email.com',
			Authorization: `Bearer ${btoa('fulaniho@email.com')} ${btoa('12345678')}`,
		},
		username: 'fulaninho',
	},
	{
		login: {
			email: 'ciclaninho@email.com',
			Authorization: `Bearer ${btoa('ciclaninho@email.com')} ${btoa(
				'12345678',
			)}`,
		},
		username: 'ciclaninho',
	},
	{
		login: {
			email: 'semnome@email.com',
			Authorization: `Bearer ${btoa('semnome@email.com')} ${btoa('12345678')}`,
		},
		username: 'sem nome',
	},
];

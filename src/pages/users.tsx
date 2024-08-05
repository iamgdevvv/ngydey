import { useResUsers } from '@/hooks/users';
import AccountBox from '@/layouts/AccountBox';
import ListingUser from '@/layouts/users/ListingUser';
import Navigation from '@/layouts/Navigation';

export default function UsersPage() {
	const { dataUsers } = useResUsers();

	return (
		<>
			<Navigation className='capitalize !mb-0'>Users</Navigation>
			<AccountBox />
			<main className='site-main pb-[48px]'>
				<ListingUser data={dataUsers} />
			</main>
		</>
	);
}

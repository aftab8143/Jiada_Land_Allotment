import PageWrapper from '../../components/layout/PageWrapper';
import Button from '../../components/ui/Button';

const ProfilePage = () => (
  <PageWrapper>
    <h1 className="text-2xl font-bold text-primary mb-4">My Profile</h1>
    <Button variant="primary">Edit Profile</Button>
  </PageWrapper>
);

export default ProfilePage;

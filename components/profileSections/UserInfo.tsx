interface UserInfoProps {
    userInfo: {
      name: string; 
      email: string; 
      password: string; 
      // Add more fields here as needed
    };
    toggleUserInfoPopup: () => void;
  }
  
  const UserInfo: React.FC<UserInfoProps> = ({ userInfo, toggleUserInfoPopup }) => {
    return (
      <section className="mb-8 p-4 bg-gray-100 rounded-lg shadow h-2/3">
        <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        {/* TODO add more info later */}

        <button
          onClick={toggleUserInfoPopup}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit Information
        </button>
      </section>
    );
  };
  
  export default UserInfo;
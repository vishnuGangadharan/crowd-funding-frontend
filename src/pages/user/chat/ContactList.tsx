import React from 'react';

interface ContactListProps {
  selectedUser: string | null;
  setSelectedUser: (user: string) => void;
}

const contacts = [
  { name: 'John Doe', lastMessage: 'Hey, how are you?', profilePic: '/images/john.jpg' },
  { name: 'Jane Smith', lastMessage: 'See you tomorrow!', profilePic: '/images/jane.jpg' },
  // Add more contacts as needed
];

const ContactList: React.FC<ContactListProps> = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="w-1/3 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Chats</h1>
      </div>
      <ul className="overflow-y-auto h-[calc(100vh-4rem)]">
        {contacts.map((contact, index) => (
          <li
            key={index}
            onClick={() => setSelectedUser(contact.name)}
            className={`flex items-center p-4 cursor-pointer ${
              selectedUser === contact.name ? 'bg-gray-100' : ''
            } hover:bg-gray-50`}
          >
            <img
              src={contact.profilePic}
              alt={contact.name}
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold">{contact.name}</p>
              <p className="text-xs text-gray-500">{contact.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

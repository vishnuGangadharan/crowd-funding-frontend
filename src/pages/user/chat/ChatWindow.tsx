import React from 'react';

interface ChatWindowProps {
  selectedUser: string;
}

const messages = [
  { from: 'John Doe', text: 'Hey! How are you?', timestamp: '12:00 PM' },
  { from: 'You', text: 'I am good, how about you?', timestamp: '12:01 PM' },
  { from: 'John Doe', text: 'Doing well, thanks!', timestamp: '12:02 PM' },
  // Add more messages as needed
];

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedUser }) => {
  return (
    <div className="flex flex-col justify-between w-2/3 h-screen">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold">{selectedUser}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.from === 'You' ? 'text-right' : ''}`}>
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.from === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'
              }`}
            >
              {msg.text}
            </div>
            <p className="mt-1 text-xs text-gray-500">{msg.timestamp}</p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t border-gray-200">
        <form className="flex">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

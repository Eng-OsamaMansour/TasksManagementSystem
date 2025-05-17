import "../Styles/Chat.css";
const Chat = () => {
  return (
    <>
      <div class="chat-container" id="chat-container">
        <div class="contact-list">
          <div class="contacts-list-header">
            <span id="contacts-list-header"> List Of Students</span>
          </div>
          <div class="contacts" id="contacts">
            <div class="contact-username">
              <span>Username</span>
            </div>
            <div class="contact-username">
              <span>Username</span>
            </div>
            <div class="contact-username">
              <span>Username</span>
            </div>
          </div>
        </div>
        <div class="chat-messages">
          <div class="chat-header">
            <span id="active-contact">Select a contact</span>
          </div>
          <div class="messages-container" id="messages-container"></div>

          <div class="message-form">
            <textarea
              id="message-input"
              placeholder="Type your message here..."
            ></textarea>
            <button onclick="sendMessage()" value="Send">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Chat;

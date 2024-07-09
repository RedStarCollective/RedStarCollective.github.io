// Generate a key for encryption
async function generateKey() {
    return await window.crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"]
    );
}

// Encrypt the data
async function encryptData(data, key) {
    const encodedData = new TextEncoder().encode(data);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        key,
        encodedData
    );
    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedData))
    };
}

// Decrypt the data
async function decryptData(encryptedData, key) {
    const decryptedData = await window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: new Uint8Array(encryptedData.iv)
        },
        key,
        new Uint8Array(encryptedData.data)
    );
    return new TextDecoder().decode(decryptedData);
}

let encryptionKey;

// Initialize the encryption key
async function initializeEncryption() {
    encryptionKey = await generateKey();
}

// Function to load forum threads
async function loadThreads() {
    const threads = JSON.parse(localStorage.getItem('forumThreads')) || [];
    const forumThreads = document.getElementById('forum-threads');
    forumThreads.innerHTML = '';

    for (const thread of threads) {
        const threadElement = document.createElement('div');
        threadElement.className = 'forum-thread';
        threadElement.innerHTML = `
            <h3>${await decryptData(thread.title, encryptionKey)}</h3>
            <p>${await decryptData(thread.content, encryptionKey)}</p>
        `;
        forumThreads.appendChild(threadElement);
    }
}

// Function to add a new thread
async function addThread(title, content) {
    const threads = JSON.parse(localStorage.getItem('forumThreads')) || [];
    threads.push({
        title: await encryptData(title, encryptionKey),
        content: await encryptData(content, encryptionKey)
    });
    localStorage.setItem('forumThreads', JSON.stringify(threads));
    await loadThreads();
}

// Event listener for the new thread form
document.getElementById('new-thread-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const title = document.getElementById('thread-title').value;
    const content = document.getElementById('thread-content').value;
    await addThread(title, content);
    this.reset();
});

// Initialize encryption and load threads when the page loads
initializeEncryption().then(() => {
    loadThreads();
});

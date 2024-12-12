export function Share(task) {
    const shareContainer = document.createElement("div");
    shareContainer.className = "share-container";
    shareContainer.innerHTML = `
          <div class="share-container-content">
              <div class="share-buttons">
                  <button class="share-button"><img src="../icons/copy.svg" alt="Copy"></button>
                    <button class="vk-button"><img src="../icons/vk.svg" alt="VK"></button>
                    <button class="telegram-button"><img src="../icons/telegram.svg" alt="Telegram"></button>
                    <button class="whatsapp-button"><img src="../icons/whatsapp.svg" alt="WhatsApp"></button>
                    <button class="facebook-button"><img src="../icons/facebook.svg" alt="Facebook"></button>
              </div>
          </div>`;
    
  
    document.body.appendChild(shareContainer);
}
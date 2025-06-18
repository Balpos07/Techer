const BASE_URL = 'https://techer.work.gd/api';

export const emailService = {
  // Get email threads
  async getEmails() {
    const response = await fetch(`${BASE_URL}/email/threads`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch emails');
    }
    return await response.json();
  },

  // Generate AI response
  async generateResponse(emailId, prompt) {
    const response = await fetch(`${BASE_URL}/email/${emailId}/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }
    return await response.json();
  },

  // Update email status
  async updateEmailStatus(emailId, status) {
    const response = await fetch(`${BASE_URL}/email/${emailId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to update email status');
    }
    return await response.json();
  }
};
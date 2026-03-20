import { AuthService } from './auth';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'https://orr-backend.orr.solutions'}`;

export class CMSService {
  private auth = AuthService.getInstance();

  async updateHomepage(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/homepage/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Homepage update failed:', response.status, errorText);
      throw new Error(`Failed to update homepage: ${response.status}`);
    }
  }

  async updateApproachSection(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/approach-section/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update approach section');
    }
  }

  async updateBusinessSystemSection(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/business-system-section/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update business system section');
    }
  }

  async updateORRRoleSection(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/orr-role-section/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update ORR role section');
    }
  }

  async updateMessageStrip(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/message-strip/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update message strip');
    }
  }

  async updateProcessSection(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/process-section/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update process section');
    }
  }

  async updateORRReportSection(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/orr-report-section/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update ORR report section');
    }
  }

  async updateServiceCard(id: number, data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/service-cards/${id}/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update service card');
    }
  }

  async updateProcessStage(id: number, data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/process-stages/${id}/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update process stage');
    }
  }

  async getHomepage(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/homepage/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch homepage');
    }

    const result = await response.json();
    return result.data || result;
  }

  async getApproachSection(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/approach-section/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch approach section');
    }

    const result = await response.json();
    return result.data || result;
  }

  async getBusinessSystemSection(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/business-system-section/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch business system section');
    }

    const result = await response.json();
    return result.data || result;
  }

  async getORRRoleSection(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/orr-role-section/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch ORR role section');
    }

    const result = await response.json();
    return result.data || result;
  }

  async getMessageStrip(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/message-strip/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch message strip');
    }

    const result = await response.json();
    return result.data || result;
  }

  async getProcessSection(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/process-section/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch process section');
    }

    const result = await response.json();
    return result.data || result;
  }

  async getORRReportSection(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/orr-report-section/`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch ORR report section');
    }

    const result = await response.json();
    return result.data || result;
  }

  async updateFAQ(id: number, data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/faqs/${id}/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FAQ update failed:', response.status, errorText);
      throw new Error(`Failed to update FAQ: ${response.status}`);
    }
  }

  // Service Pillar Pages
  async getStrategicAdvisoryContent(): Promise<any> {
    console.log('🌐 Making API call to:', `${API_BASE_URL}/admin-portal/v1/cms/strategic-advisory/`);
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/strategic-advisory/`
    );

    console.log('📊 Strategic Advisory Response Status:', response.status);
    console.log('📊 Strategic Advisory Response OK:', response.ok);

    if (!response.ok) {
      console.error('❌ Strategic Advisory API Error:', response.status, response.statusText);
      throw new Error('Failed to fetch Strategic Advisory content');
    }

    const result = await response.json();
    console.log('📊 Strategic Advisory Raw Result:', result);
    return result;
  }

  async updateStrategicAdvisoryContent(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/strategic-advisory/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update Strategic Advisory content');
    }
  }

  async getOperationalSystemsContent(): Promise<any> {
    console.log('🌐 Making API call to:', `${API_BASE_URL}/admin-portal/v1/cms/operational-systems/`);
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/operational-systems/`
    );

    console.log('📊 Operational Systems Response Status:', response.status);
    console.log('📊 Operational Systems Response OK:', response.ok);

    if (!response.ok) {
      console.error('❌ Operational Systems API Error:', response.status, response.statusText);
      throw new Error('Failed to fetch Operational Systems content');
    }

    const result = await response.json();
    console.log('📊 Operational Systems Raw Result:', result);
    return result;
  }

  async updateOperationalSystemsContent(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/operational-systems/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update Operational Systems content');
    }
  }

  async getLivingSystemsContent(): Promise<any> {
    console.log('🌐 Making API call to:', `${API_BASE_URL}/admin-portal/v1/cms/living-systems/`);
    const response = await fetch(
      `${API_BASE_URL}/admin-portal/v1/cms/living-systems/`
    );

    console.log('📊 Living Systems Response Status:', response.status);
    console.log('📊 Living Systems Response OK:', response.ok);

    if (!response.ok) {
      console.error('❌ Living Systems API Error:', response.status, response.statusText);
      throw new Error('Failed to fetch Living Systems content');
    }

    const result = await response.json();
    console.log('📊 Living Systems Raw Result:', result);
    return result;
  }

  async updateLivingSystemsContent(data: Partial<any>): Promise<void> {
    const response = await this.auth.makeAuthenticatedRequest(
      `${API_BASE_URL}/admin-portal/v1/cms/living-systems/`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to update Living Systems content');
    }
  }
}

export const cmsApi = new CMSService();
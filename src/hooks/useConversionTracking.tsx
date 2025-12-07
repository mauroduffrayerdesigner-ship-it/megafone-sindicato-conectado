import { useCallback } from 'react';

// Define tipos para os eventos de conversão
export type ConversionEventType = 
  | 'lead_submitted'
  | 'newsletter_signup'
  | 'page_view'
  | 'button_click'
  | 'form_start'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click';

export interface ConversionEventData {
  event_category?: string;
  event_label?: string;
  value?: number;
  service?: string;
  organization?: string;
  email?: string;
  page_path?: string;
  button_text?: string;
  form_name?: string;
  [key: string]: string | number | boolean | undefined;
}

// Lista de eventos disponíveis para documentação
export const AVAILABLE_EVENTS = [
  {
    name: 'lead_submitted',
    description: 'Disparado quando um lead envia o formulário de contato',
    category: 'conversao',
    parameters: ['service', 'organization', 'email'],
  },
  {
    name: 'newsletter_signup',
    description: 'Disparado quando alguém assina a newsletter',
    category: 'engajamento',
    parameters: ['email'],
  },
  {
    name: 'page_view',
    description: 'Disparado quando uma página é visualizada',
    category: 'navegacao',
    parameters: ['page_path'],
  },
  {
    name: 'button_click',
    description: 'Disparado quando um botão CTA é clicado',
    category: 'engajamento',
    parameters: ['button_text', 'page_path'],
  },
  {
    name: 'form_start',
    description: 'Disparado quando o usuário começa a preencher um formulário',
    category: 'engajamento',
    parameters: ['form_name'],
  },
  {
    name: 'whatsapp_click',
    description: 'Disparado quando o link do WhatsApp é clicado',
    category: 'contato',
    parameters: [],
  },
  {
    name: 'phone_click',
    description: 'Disparado quando o telefone é clicado',
    category: 'contato',
    parameters: [],
  },
  {
    name: 'email_click',
    description: 'Disparado quando o e-mail é clicado',
    category: 'contato',
    parameters: [],
  },
];

// Declaração global do dataLayer (fbq declarado em TrackingScripts.tsx)
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: ((...args: unknown[]) => void) | undefined;
  }
}

export const useConversionTracking = () => {
  // Push evento para o dataLayer (GTM)
  const pushToDataLayer = useCallback((event: string, data: ConversionEventData) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event,
        ...data,
        timestamp: new Date().toISOString(),
      });
      console.log('[Tracking] DataLayer push:', event, data);
    }
  }, []);

  // Enviar evento para GA4 via gtag
  const sendToGA4 = useCallback((event: string, data: ConversionEventData) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, {
        event_category: data.event_category,
        event_label: data.event_label,
        value: data.value,
        ...data,
      });
      console.log('[Tracking] GA4 event:', event, data);
    }
  }, []);

  // Enviar evento para Meta Pixel
  const sendToMetaPixel = useCallback((event: string, data: ConversionEventData) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      // Mapear eventos para eventos padrão do Meta
      const metaEventMap: Record<string, string> = {
        lead_submitted: 'Lead',
        newsletter_signup: 'Subscribe',
        page_view: 'PageView',
        button_click: 'ViewContent',
        form_start: 'InitiateCheckout',
        whatsapp_click: 'Contact',
        phone_click: 'Contact',
        email_click: 'Contact',
      };

      const metaEvent = metaEventMap[event] || event;
      window.fbq('track', metaEvent, data);
      console.log('[Tracking] Meta Pixel event:', metaEvent, data);
    } else {
      console.log('[Tracking] Meta Pixel não disponível para evento:', event);
    }
  }, []);

  // Função principal para disparar eventos
  const trackEvent = useCallback((
    eventType: ConversionEventType,
    data: ConversionEventData = {}
  ) => {
    const eventData: ConversionEventData = {
      page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      ...data,
    };

    // Adicionar categoria padrão baseada no tipo de evento
    const categoryMap: Record<ConversionEventType, string> = {
      lead_submitted: 'conversao',
      newsletter_signup: 'engajamento',
      page_view: 'navegacao',
      button_click: 'engajamento',
      form_start: 'engajamento',
      whatsapp_click: 'contato',
      phone_click: 'contato',
      email_click: 'contato',
    };

    eventData.event_category = eventData.event_category || categoryMap[eventType];

    // Disparar para todos os sistemas de tracking
    pushToDataLayer(eventType, eventData);
    sendToGA4(eventType, eventData);
    sendToMetaPixel(eventType, eventData);
  }, [pushToDataLayer, sendToGA4, sendToMetaPixel]);

  // Eventos específicos com tipos seguros
  const trackLeadSubmitted = useCallback((data: {
    service?: string;
    organization?: string;
    email?: string;
  }) => {
    trackEvent('lead_submitted', {
      event_label: 'formulario_contato',
      value: 1,
      ...data,
    });
  }, [trackEvent]);

  const trackNewsletterSignup = useCallback((email?: string) => {
    trackEvent('newsletter_signup', {
      event_label: 'newsletter_home',
      value: 1,
      email,
    });
  }, [trackEvent]);

  const trackButtonClick = useCallback((buttonText: string) => {
    trackEvent('button_click', {
      event_label: buttonText,
      button_text: buttonText,
    });
  }, [trackEvent]);

  const trackFormStart = useCallback((formName: string) => {
    trackEvent('form_start', {
      event_label: formName,
      form_name: formName,
    });
  }, [trackEvent]);

  const trackWhatsAppClick = useCallback(() => {
    trackEvent('whatsapp_click', {
      event_label: 'whatsapp_contato',
    });
  }, [trackEvent]);

  const trackPhoneClick = useCallback(() => {
    trackEvent('phone_click', {
      event_label: 'telefone_contato',
    });
  }, [trackEvent]);

  const trackEmailClick = useCallback(() => {
    trackEvent('email_click', {
      event_label: 'email_contato',
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackLeadSubmitted,
    trackNewsletterSignup,
    trackButtonClick,
    trackFormStart,
    trackWhatsAppClick,
    trackPhoneClick,
    trackEmailClick,
  };
};

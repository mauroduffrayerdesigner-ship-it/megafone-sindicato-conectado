import { useEffect, useState } from 'react';
import { useIntegrations } from '@/hooks/useIntegrations';

interface TrackingConfig {
  gtmContainerId?: string;
  ga4MeasurementId?: string;
  metaPixelId?: string;
}

export const TrackingScripts = () => {
  const { integrations, isLoading } = useIntegrations();
  const [config, setConfig] = useState<TrackingConfig>({});
  const [scriptsLoaded, setScriptsLoaded] = useState({
    gtm: false,
    ga4: false,
    meta: false,
  });

  // Extrair configurações das integrações ativas
  useEffect(() => {
    if (isLoading || !integrations) return;

    const newConfig: TrackingConfig = {};

    integrations.forEach((integration) => {
      if (!integration.active) return;
      
      const integrationConfig = integration.config as Record<string, string> | null;
      if (!integrationConfig) return;

      switch (integration.name) {
        case 'google_tag_manager':
          if (integrationConfig.container_id) {
            newConfig.gtmContainerId = integrationConfig.container_id;
          }
          break;
        case 'google_analytics':
          if (integrationConfig.measurement_id) {
            newConfig.ga4MeasurementId = integrationConfig.measurement_id;
          }
          break;
        case 'meta_pixel':
          if (integrationConfig.pixel_id) {
            newConfig.metaPixelId = integrationConfig.pixel_id;
          }
          break;
      }
    });

    setConfig(newConfig);
  }, [integrations, isLoading]);

  // Inicializar dataLayer
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
    }
  }, []);

  // Carregar Google Tag Manager
  useEffect(() => {
    if (!config.gtmContainerId || scriptsLoaded.gtm) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${config.gtmContainerId}`;
    
    // Push GTM initialization
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    script.onload = () => {
      console.log('[Tracking] GTM loaded:', config.gtmContainerId);
      setScriptsLoaded(prev => ({ ...prev, gtm: true }));
    };

    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${config.gtmContainerId}`;
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.display = 'none';
    iframe.style.visibility = 'hidden';
    noscript.appendChild(iframe);
    document.body.insertBefore(noscript, document.body.firstChild);

    return () => {
      // Cleanup não remove scripts já carregados para evitar problemas
    };
  }, [config.gtmContainerId, scriptsLoaded.gtm]);

  // Carregar Google Analytics 4
  useEffect(() => {
    if (!config.ga4MeasurementId || scriptsLoaded.ga4) return;

    // Carregar gtag.js
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4MeasurementId}`;
    
    script.onload = () => {
      // Inicializar gtag
      window.dataLayer = window.dataLayer || [];
      
      // Definir função gtag
      window.gtag = function gtag(...args: unknown[]) {
        window.dataLayer.push({ args });
      };
      
      window.gtag('js', new Date());
      window.gtag('config', config.ga4MeasurementId, {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
      });

      console.log('[Tracking] GA4 loaded:', config.ga4MeasurementId);
      setScriptsLoaded(prev => ({ ...prev, ga4: true }));
    };

    document.head.appendChild(script);
  }, [config.ga4MeasurementId, scriptsLoaded.ga4]);

  // Carregar Meta Pixel
  useEffect(() => {
    if (!config.metaPixelId || scriptsLoaded.meta) return;

    // Inicializar fbq
    const fbqScript = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${config.metaPixelId}');
      fbq('track', 'PageView');
    `;

    const script = document.createElement('script');
    script.innerHTML = fbqScript;
    document.head.appendChild(script);

    // Add noscript fallback
    const noscript = document.createElement('noscript');
    const img = document.createElement('img');
    img.height = 1;
    img.width = 1;
    img.style.display = 'none';
    img.src = `https://www.facebook.com/tr?id=${config.metaPixelId}&ev=PageView&noscript=1`;
    noscript.appendChild(img);
    document.head.appendChild(noscript);

    console.log('[Tracking] Meta Pixel loaded:', config.metaPixelId);
    setScriptsLoaded(prev => ({ ...prev, meta: true }));
  }, [config.metaPixelId, scriptsLoaded.meta]);

  // Este componente não renderiza nada visualmente
  return null;
};

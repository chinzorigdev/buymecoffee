/**
 * Google OAuth Best Practices Implementation
 * Following international UX standards and Google's OAuth guidelines
 */

export interface GoogleOAuthConfig {
  // Brand consistency
  brandName: string;
  brandColor: string;

  // Security settings
  enableTwoFactor?: boolean;
  sessionTimeout?: number; // in minutes

  // UX settings
  showProgressIndicators: boolean;
  enableRetryMechanism: boolean;
  maxRetryAttempts: number;
}

export const DEFAULT_OAUTH_CONFIG: GoogleOAuthConfig = {
  brandName: "БүйМиКофи",
  brandColor: "#facc15", // yellow-400
  enableTwoFactor: false,
  sessionTimeout: 30, // 30 minutes
  showProgressIndicators: true,
  enableRetryMechanism: true,
  maxRetryAttempts: 3,
};

/**
 * OAuth Error Categories based on international standards
 */
export enum OAuthErrorType {
  // User-initiated errors
  USER_CANCELLED = "user_cancelled",
  POPUP_BLOCKED = "popup_blocked",

  // Network errors
  NETWORK_ERROR = "network_error",
  TIMEOUT = "timeout",

  // OAuth-specific errors
  INVALID_CLIENT = "invalid_client",
  INVALID_GRANT = "invalid_grant",
  INVALID_SCOPE = "invalid_scope",

  // Account errors
  ACCOUNT_NOT_LINKED = "account_not_linked",
  EMAIL_NOT_VERIFIED = "email_not_verified",
  ACCOUNT_SUSPENDED = "account_suspended",

  // Server errors
  SERVER_ERROR = "server_error",
  CONFIGURATION_ERROR = "configuration_error",
}

/**
 * Localized error messages for Mongolian users
 */
export const OAUTH_ERROR_MESSAGES = {
  [OAuthErrorType.USER_CANCELLED]: {
    mn: "Та Google нэвтрэлтийг цуцаллаа. Дахин оролдох бол товчийг дарна уу.",
    en: "Google sign-in was cancelled. Click the button to try again.",
    action: "retry",
    severity: "info",
  },
  [OAuthErrorType.POPUP_BLOCKED]: {
    mn: "Браузер popup-г блоклосон байна. Popup-г зөвшөөрч дахин оролдоно уу.",
    en: "Browser blocked the popup. Please allow popups and try again.",
    action: "retry",
    severity: "warning",
  },
  [OAuthErrorType.NETWORK_ERROR]: {
    mn: "Интернет холболтын алдаа. Холболтоо шалгаад дахин оролдоно уу.",
    en: "Network connection error. Please check your connection and try again.",
    action: "retry",
    severity: "error",
  },
  [OAuthErrorType.ACCOUNT_NOT_LINKED]: {
    mn: "Энэ Google аккаунт өөр имэйлтэй холбогдсон. Имэйл/нууц үгээр нэвтэрч Google-г холбоно уу.",
    en: "This Google account is linked to a different email. Sign in with email/password first.",
    action: "signin",
    severity: "warning",
  },
  [OAuthErrorType.EMAIL_NOT_VERIFIED]: {
    mn: "Google аккаунтын имэйл баталгаажаагүй байна. Gmail-ээ нээж баталгаажуулна уу.",
    en: "Google account email is not verified. Please verify your Gmail account.",
    action: "external",
    severity: "warning",
  },
  [OAuthErrorType.SERVER_ERROR]: {
    mn: "Серверийн алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.",
    en: "Server error occurred. Please wait a moment and try again.",
    action: "retry",
    severity: "error",
  },
} as const;

/**
 * OAuth Analytics Events for tracking user behavior
 */
export interface OAuthAnalyticsEvent {
  event: string;
  provider: "google" | "facebook" | "twitter";
  action: "start" | "success" | "error" | "cancel";
  error_code?: string;
  retry_count?: number;
  user_agent?: string;
  timestamp: Date;
}

/**
 * OAuth Security Utilities
 */
export class OAuthSecurity {
  private static readonly CSRF_TOKEN_LENGTH = 32;

  /**
   * Generate CSRF token for OAuth requests
   */
  static generateCSRFToken(): string {
    const array = new Uint8Array(this.CSRF_TOKEN_LENGTH);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }

  /**
   * Validate OAuth state parameter
   */
  static validateState(receivedState: string, expectedState: string): boolean {
    return (
      receivedState === expectedState &&
      receivedState.length === this.CSRF_TOKEN_LENGTH * 2
    );
  }

  /**
   * Check if current environment is secure
   */
  static isSecureEnvironment(): boolean {
    return (
      typeof window !== "undefined" &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "localhost")
    );
  }
}

/**
 * OAuth Retry Mechanism
 */
export class OAuthRetryManager {
  private retryCount: number = 0;
  private readonly maxRetries: number;
  private readonly backoffMultiplier: number = 1.5;
  private readonly baseDelay: number = 1000; // 1 second

  constructor(maxRetries: number = 3) {
    this.maxRetries = maxRetries;
  }

  canRetry(): boolean {
    return this.retryCount < this.maxRetries;
  }

  getRetryDelay(): number {
    return this.baseDelay * Math.pow(this.backoffMultiplier, this.retryCount);
  }

  incrementRetry(): void {
    this.retryCount++;
  }

  reset(): void {
    this.retryCount = 0;
  }

  getRetryCount(): number {
    return this.retryCount;
  }
}

/**
 * OAuth Progress Tracker for UX
 */
export interface OAuthProgress {
  step:
    | "initializing"
    | "redirecting"
    | "authenticating"
    | "processing"
    | "completing";
  message: string;
  progress: number; // 0-100
}

export const OAUTH_PROGRESS_STEPS: Record<
  OAuthProgress["step"],
  OAuthProgress
> = {
  initializing: {
    step: "initializing",
    message: "Google нэвтрэлт эхлүүлж байна...",
    progress: 20,
  },
  redirecting: {
    step: "redirecting",
    message: "Google руу шилжүүлж байна...",
    progress: 40,
  },
  authenticating: {
    step: "authenticating",
    message: "Google-д нэвтэрч байна...",
    progress: 60,
  },
  processing: {
    step: "processing",
    message: "Таны мэдээллийг боловсруулж байна...",
    progress: 80,
  },
  completing: {
    step: "completing",
    message: "Дуусгаж байна...",
    progress: 100,
  },
};

/**
 * OAuth Accessibility helpers
 */
export class OAuthAccessibility {
  /**
   * Announce status to screen readers
   */
  static announceStatus(message: string): void {
    const announcement = document.createElement("div");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  /**
   * Set focus to appropriate element after OAuth completion
   */
  static setFocusAfterOAuth(
    targetSelector: string = "[data-oauth-focus]"
  ): void {
    const target = document.querySelector(targetSelector) as HTMLElement;
    if (target) {
      target.focus();
    }
  }
}

export default {
  OAuthErrorType,
  OAUTH_ERROR_MESSAGES,
  OAuthSecurity,
  OAuthRetryManager,
  OAUTH_PROGRESS_STEPS,
  OAuthAccessibility,
  DEFAULT_OAUTH_CONFIG,
};

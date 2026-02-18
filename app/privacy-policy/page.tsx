import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Haneri Electricals LLP",
  description:
    "Privacy Policy for HANERI ELECTRICALS LLP. Learn about how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative bg-primary pt-20 md:pt-40 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="heading_1 text-center mb-8 uppercase text-[#315859]">
            Privacy Policy
          </h1>
          <p className="container mx-auto max-w-4xl text-neutral-600 leading-relaxed">
            At HANERI ELECTRICALS LLP and its subsidiaries (&ldquo;we,&rdquo;
            &ldquo;us,&rdquo; &ldquo;our,&rdquo; or &ldquo;HANERI&rdquo;), we
            are committed to safeguarding your privacy. This Privacy Policy
            (&ldquo;Policy&rdquo;) outlines our practices regarding the
            collection, use, and processing of your Personal Data when you
            interact with our services, products, and related web applications
            (collectively referred to as &ldquo;Products&rdquo;).
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        {/* Scope */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl  text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Scope of this Policy
          </h2>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            This Policy applies to:
          </p>
          <ul className="text-neutral-600 mb-4 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              Applications and websites hosted by HANERI ELECTRICALS LLP
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                Related services accessed through{" "}
                <a
                  href="https://www.haneri.in"
                  className="text-brand hover:text-brand-dark underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.haneri.in
                </a>
              </span>
            </li>
          </ul>
          <p className="text-neutral-600 mb-2 leading-relaxed font-semibold">
            In this Policy:
          </p>
          <ul className="text-neutral-600 space-y-2 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  &ldquo;Personal Data&rdquo;
                </strong>{" "}
                refers to information that can identify an individual either on
                its own or when combined with other data we have or collect
                through third-party analytics tools.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  &ldquo;Smart Devices&rdquo;
                </strong>{" "}
                are nonstandard computing devices with human-machine interfaces
                and network connectivity, such as smart home appliances,
                wearables, air purifiers, laptops, tablets, and desktop
                computers.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">&ldquo;Apps&rdquo;</strong>{" "}
                are mobile applications developed by or for HANERI, enabling
                users to remotely control Smart Devices and connect with the
                HANERI Platform.
              </span>
            </li>
          </ul>
        </section>

        {/* Information We Collect */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Information We Collect
          </h2>

          <h3 className="text-lg font-heading font-semibold mb-3 text-primary-dark">
            1. Information You Provide
          </h3>
          <ul className="text-neutral-600 mb-6 space-y-3 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  Account or Profile Data:
                </strong>{" "}
                When you create an account, we collect your name, contact
                details (email address, phone number), username, and login
                credentials. Additional details, such as your nickname, profile
                picture, country code, language preference, and time zone, may
                also be collected.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Feedback:</strong> If you
                use feedback or suggestion features, we collect your email
                address, phone number, and feedback content to address concerns
                and resolve issues promptly.
              </span>
            </li>
          </ul>

          <h3 className="text-lg font-heading font-semibold mb-3 text-primary-dark">
            2. Information We Collect Automatically
          </h3>
          <ul className="text-neutral-600 mb-6 space-y-3 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  Device Information:
                </strong>{" "}
                We automatically gather data such as device MAC addresses, IP
                addresses, wireless connection details, operating system
                type/version, app version, push notification identifiers, log
                files, and crash reports.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Usage Data:</strong>{" "}
                Interaction data, including visits, clicks, downloads, and
                messages, is collected during your use of our Products and
                services.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Log Information:</strong>{" "}
                System and exception logs are automatically uploaded when you
                use our website or apps.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">Location Data:</strong>{" "}
                With your permission, we may collect your real-time location,
                such as for astronomical lighting schedules based on local
                sunrise/sunset times.
              </span>
            </li>
          </ul>

          <h3 className="text-lg font-heading font-semibold mb-3 text-primary-dark">
            3. Smart Device Data
          </h3>
          <ul className="text-neutral-600 space-y-3 pl-5">
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  Basic Device Information:
                </strong>{" "}
                When connecting Smart Devices to our services, we may collect
                details like device name, ID, online status, activation time,
                firmware and hardware versions, and upgrade history.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand mt-1 shrink-0">&#9679;</span>
              <span>
                <strong className="text-neutral-700">
                  Device-Generated Data:
                </strong>{" "}
                Depending on the device, specific usage data may be collected,
                such as operational times for smart water heaters.
              </span>
            </li>
          </ul>
        </section>

        {/* Purpose and Legal Basis */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Purpose and Legal Basis for Processing Personal Data
          </h2>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            We process your Personal Data for the following purposes:
          </p>
          <ol className="text-neutral-600 space-y-3 pl-5 list-none counter-reset-section">
            {[
              {
                title: "Providing Services",
                desc: "To deliver the requested services, including account management, product functionality, and app interactions. This processing is necessary to fulfill our contractual obligations.",
              },
              {
                title: "Improving Services",
                desc: "To enhance product safety, efficiency, and user experience while analyzing operational performance and preventing misuse.",
              },
              {
                title: "Non-Marketing Communication",
                desc: "To send essential updates regarding services, policies, and terms. Such communications are integral to our agreement and cannot be opted out of.",
              },
              {
                title: "Marketing Communication",
                desc: "With your consent, we may send promotional materials. Each communication will include options to opt out.",
              },
              {
                title: "Personalization",
                desc: "To tailor product recommendations and service experiences based on your preferences.",
              },
              {
                title: "Legal Compliance",
                desc: "To comply with applicable laws, respond to legal processes, and protect our operations, rights, and user safety.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>
                  <strong className="text-neutral-700">{item.title}:</strong>{" "}
                  {item.desc}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Sharing Personal Data */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl  text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Sharing Personal Data
          </h2>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            We share Personal Data only as outlined below:
          </p>
          <ol className="text-neutral-600 space-y-3 pl-5 list-none">
            {[
              {
                title: "Service Providers",
                desc: "Third-party vendors who assist with services like hosting, data analysis, payments, IT support, and customer service.",
              },
              {
                title: "Business Partners",
                desc: "Entities that provide Smart Devices, networks, or related systems.",
              },
              {
                title: "Corporate Transactions",
                desc: "In the event of a merger, sale, or reorganization, data may be transferred as part of the transaction, with appropriate user notification.",
              },
              {
                title: "Legal Requirements",
                desc: "To comply with laws, legal processes, or government requests, and to enforce terms or protect our rights and users.",
              },
              {
                title: "Affiliates",
                desc: "Within our corporate group for regular business operations.",
              },
              {
                title: "With Consent",
                desc: "Sharing with third parties is done only with your explicit consent.",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-primary text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>
                  <strong className="text-neutral-700">{item.title}:</strong>{" "}
                  {item.desc}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl  text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            How We Use Your Information
          </h2>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            We utilize the collected information to:
          </p>
          <ul className="text-neutral-600 mb-6 space-y-2 pl-5">
            {[
              "Personalize your experience",
              "Improve services and customer support",
              "Process transactions",
              "Administer promotions, surveys, or other features",
              "Send periodic updates and emails",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand mt-1 shrink-0">&#9679;</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-heading font-semibold mb-3 text-primary-dark">
            Use of Email Address/Contact Number
          </h3>
          <p className="text-neutral-600 leading-relaxed">
            By sharing your email or phone number, you consent to receive
            communications from us. We ensure that these messages are sent only
            to users who have authorized contact.
          </p>
        </section>

        {/* International Data Transfers */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859]  md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            International Data Transfers
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Your Personal Data may be transferred to and processed in countries
            with different privacy laws than your own. We ensure compliance with
            applicable laws and safeguard your data throughout this process.
          </p>
        </section>

        {/* Your Rights */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl  text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Your Rights
          </h2>
          <p className="text-neutral-600 mb-4 leading-relaxed">
            We respect your rights regarding your Personal Data. You may:
          </p>
          <ul className="text-neutral-600 mb-6 space-y-2 pl-5">
            {[
              "Access the Personal Data we process about you.",
              "Request corrections to inaccurate or incomplete data.",
              "Request deletion of your data.",
              "Restrict the processing of your data.",
              "Request data transfer to yourself or a third party.",
              "Object to or opt out of data processing based on your consent.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand mt-1 shrink-0">&#9679;</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-neutral-600 leading-relaxed">
            To exercise your rights, contact us at{" "}
            <a
              href="mailto:INFO@HANERI.co.in"
              className="text-brand hover:text-brand-dark font-semibold underline transition-colors"
            >
              INFO@HANERI.co.in
            </a>
            . We may verify your identity before proceeding with your request to
            ensure security.
          </p>
        </section>

        {/* Security Measures */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859]  md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Security Measures
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            We employ industry-standard security practices, including
            encryption, access authentication, and secure data storage, to
            protect your Personal Data. If you suspect a security issue, please
            notify us immediately at{" "}
            <a
              href="mailto:INFO@HANERI.in"
              className="text-brand hover:text-brand-dark font-semibold underline transition-colors"
            >
              INFO@HANERI.in
            </a>
          </p>
        </section>

        {/* Data Retention */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Data Retention
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Personal Data is retained only for as long as necessary for the
            purposes outlined in this Policy, unless a longer retention period
            is legally required. Upon expiration of the retention period, we
            securely delete or anonymize your data.
          </p>
        </section>

        {/* Policy Updates */}
        <section className="mb-10 pb-10 border-b border-neutral-200">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Policy Updates
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            This Privacy Policy may be updated periodically to reflect changes
            in our practices. Material updates will be communicated via email or
            app notifications. We encourage you to review this Policy regularly
            for the latest information.
          </p>
        </section>

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-xl text-[#315859] md:text-2xl font-heading font-bold mb-4 text-primary-green uppercase tracking-wide">
            Contact Us
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            For any questions or concerns regarding this Privacy Policy, please
            contact us at{" "}
            <a
              href="mailto:INFO@HANERI.in"
              className="text-brand hover:text-brand-dark font-semibold underline transition-colors"
            >
              INFO@HANERI.in
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

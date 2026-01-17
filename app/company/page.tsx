"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { PageBreadcrumb } from "@/components/page-breadcrumb"
import { PageHeader } from "@/components/page-header"
import { useLanguage } from "@/contexts/language-context"

export default function CompanyPage() {
  const { t, language } = useLanguage()

  return (
    <>
      <Header />
      <PageBreadcrumb />
      <main className="pt-20">
        <PageHeader title={t("companyPage.title")} description={t("companyPage.description")} />

        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24">
          <div className="container mx-auto px-4"></div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">{t("companyPage.greeting.title")}</h2>
              <div className="flex flex-col items-center">
                <div className="mb-8 border-none">
                  <img
                    src="/assets/logo.png"
                    alt="メラボコ ロゴ"
                    className="w-40 h-40 md:w-48 md:h-48 object-contain mx-auto border-none"
                  />
                </div>
                <div className="text-center max-w-3xl">
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">{t("companyPage.greeting.message1")}</p>
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">{t("companyPage.greeting.message2")}</p>
                  <p className="text-lg leading-relaxed text-gray-700 mb-6">{t("companyPage.greeting.message3")}</p>
                  <p className="text-right text-gray-600 mt-8">{t("companyPage.greeting.signature")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">{t("companyPage.info.title")}</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <th className="bg-gray-50 p-4 md:p-6 text-left font-semibold w-1/3">
                        {t("companyPage.info.tradeName")}
                      </th>
                      <td className="p-4 md:p-6">メラボコ</td>
                    </tr>
                    <tr className="border-b">
                      <th className="bg-gray-50 p-4 md:p-6 text-left font-semibold">
                        {t("companyPage.info.businessType")}
                      </th>
                      <td className="p-4 md:p-6">{t("companyPage.info.businessTypeValue")}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="bg-gray-50 p-4 md:p-6 text-left font-semibold">
                        {t("companyPage.info.location")}
                      </th>
                      <td className="p-4 md:p-6">
                        〒107-0061
                        <br />
                        {language === "ja" ? "東京都港区北青山1-3-3" : "1-3-3 Kita-Aoyama, Minato-ku, Tokyo, Japan"}
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="bg-gray-50 p-4 md:p-6 text-left font-semibold">{t("companyPage.info.phone")}</th>
                      <td className="p-4 md:p-6">
                        <a href="tel:050-1793-1290" className="text-blue-600 hover:underline flex items-center gap-2">
                          <i className="fas fa-phone text-sm"></i>
                          050-1793-1290
                        </a>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">{t("companyPage.info.aiNotice")}</p>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="bg-gray-50 p-4 md:p-6 text-left font-semibold">
                        {t("companyPage.info.business")}
                      </th>
                      <td className="p-4 md:p-6">
                        <ul className="space-y-2">
                          {t("companyPage.info.businessItems").map((item: string, index: number) => (
                            <li key={index}>・{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th className="bg-gray-50 p-4 md:p-6 text-left font-semibold">{t("companyPage.info.email")}</th>
                      <td className="p-4 md:p-6">
                        <a href="mailto:meraboco.2025.8@gmail.com" className="text-blue-600 hover:underline">
                          meraboco.2025.8@gmail.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t("companyPage.philosophy.title")}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">{t("companyPage.philosophy.mission")}</h3>
                <p className="leading-relaxed text-gray-700">{t("companyPage.philosophy.missionText")}</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-8 shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-indigo-900">{t("companyPage.philosophy.vision")}</h3>
                <p className="leading-relaxed text-gray-700">{t("companyPage.philosophy.visionText")}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">{t("companyPage.values.title")}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-lightbulb text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{t("companyPage.values.innovation")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("companyPage.values.innovationText")}</p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-handshake text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{t("companyPage.values.trust")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("companyPage.values.trustText")}</p>
              </div>
              <div className="bg-white rounded-lg p-8 shadow-md text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-rocket text-3xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-bold mb-3">{t("companyPage.values.growth")}</h3>
                <p className="text-gray-600 leading-relaxed">{t("companyPage.values.growthText")}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

import { useEffect, useState } from "react";
import { useSearch, Link } from "wouter";
import { trpc } from "@/lib/trpc";
import Navbar from "@/components/Navbar";
import {
  CheckCircle2, Download, Loader2, AlertCircle, ShieldCheck, MessageCircle, Home
} from "lucide-react";

export default function SuccessPage() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const preferenceId = params.get("preference_id") ?? "";
  const externalRef = params.get("external_reference") ?? "";
  const downloadToken = params.get("token") ?? "";

  const [pollingEnabled, setPollingEnabled] = useState(!!preferenceId && !downloadToken);

  // If we already have a token (direct link), skip polling
  const { data: downloadData, isLoading: downloadLoading } = trpc.orders.getDownload.useQuery(
    { token: downloadToken },
    { enabled: !!downloadToken }
  );

  const { data: statusData, isLoading: statusLoading } = trpc.orders.checkStatus.useQuery(
    { preferenceId },
    {
      enabled: pollingEnabled && !!preferenceId,
      refetchInterval: pollingEnabled ? 3000 : false,
    }
  );

  useEffect(() => {
    if (statusData?.status === "approved" && statusData.downloadToken) {
      setPollingEnabled(false);
    }
  }, [statusData]);

  const isApproved = downloadData || (statusData?.status === "approved");
  const token = downloadToken || statusData?.downloadToken;
  const productTitle = downloadData?.productTitle;
  const fileUrl = downloadData?.fileUrl;

  const isLoading = downloadLoading || (pollingEnabled && statusLoading);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md text-center space-y-6">
          {isLoading ? (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Processando seu pagamento...</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Aguarde enquanto confirmamos seu pagamento. Isso pode levar alguns segundos.
                </p>
              </div>
            </>
          ) : isApproved ? (
            <>
              {/* Success */}
              <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-foreground">Pagamento Aprovado!</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Seu acesso foi liberado. Faça o download do seu material agora.
                </p>
              </div>

              {productTitle && (
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-left">
                  <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">Seu produto</p>
                  <p className="text-sm font-semibold text-foreground">{productTitle}</p>
                </div>
              )}

              {fileUrl ? (
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-colors text-base shadow-lg shadow-primary/20"
                >
                  <Download className="w-5 h-5" />
                  Baixar Meu Material (PDF)
                </a>
              ) : (
                <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                  <p className="text-sm text-amber-400 font-medium">
                    Seu material estará disponível em breve. Verifique seu e-mail ou entre em contato com o suporte.
                  </p>
                </div>
              )}

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Compra protegida com garantia de 7 dias
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Pending or error */}
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Pagamento em Análise</h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Seu pagamento está sendo processado. Assim que for aprovado, o download será liberado automaticamente.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-white/8 bg-card text-sm text-muted-foreground">
                Se o pagamento foi aprovado e o download não foi liberado, entre em contato com nosso suporte.
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2">
            <a
              href="https://wa.me/5521981672064"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 border border-primary/30 text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Suporte via WhatsApp
            </a>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-2.5 border border-white/10 text-muted-foreground font-medium rounded-lg hover:bg-white/5 transition-colors text-sm"
            >
              <Home className="w-4 h-4" />
              Voltar para a loja
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

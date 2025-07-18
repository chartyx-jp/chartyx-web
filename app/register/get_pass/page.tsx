"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// パスワードのみのバリデーションスキーマ
const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください。")
    .max(100, "パスワードは100文字以内で入力してください。"),
});

type PasswordFormInput = z.infer<typeof passwordSchema>;

export default function PasswordPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordFormInput>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<PasswordFormInput> = async (data) => {
    setApiError(null);

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endPoint: "/users/auth/signup/",
          password: data.password,
        }),
      });

      // レスポンスの処理を改善
      if (!response.ok) {
        let errorMessage = "パスワードの設定に失敗しました。";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error("Error parsing response:", e);
        }
        throw new Error(errorMessage);
      }

      // 成功したら plans ページにリダイレクト
      router.push("/register/plans");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "不明なエラーが発生しました。";
      setApiError(errorMessage);
      console.error("Password setting failed:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          marginBottom: 8,
          padding: { xs: 2, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          パスワードの設定
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3, width: "100%" }}
        >
          {apiError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {apiError}
            </Alert>
          )}
          <TextField
            {...register("password")}
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="new-password"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 3 }}
          >
            パスワードを設定
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}


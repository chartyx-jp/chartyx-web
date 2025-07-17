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
  MenuItem,
  Alert,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

// Zodスキーマでバリデーションルールを定義
const signupSchema = z.object({
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください。")
    .max(100, "パスワードは100文字以内で入力してください。"),
  lastName: z
    .string()
    .min(1, "姓を入力してください。")
    .max(50, "姓は50文字以内で入力してください。"),
  firstName: z
    .string()
    .min(1, "名を入力してください。")
    .max(50, "名は50文字以内で入力してください。"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "性別を選択してください。" }),
  }),
  birthday: z
    .string()
    .min(1, "誕生日を入力してください。")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "有効な日付を入力してください。",
    }),
  phoneNumber: z
    .string()
    .min(1, "携帯電話番号を入力してください。")
    .regex(
      /^\d{2,4}-\d{3,4}-\d{4}$/,
      "有効な電話番号（例: 090-1234-5678）を入力してください。"
    ),
  address: z
    .string()
    .min(1, "住所を入力してください。")
    .max(200, "住所は200文字以内で入力してください。"),
});

// ZodスキーマからTypeScriptの型を推論
type SignupFormInputs = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: "",
      lastName: "",
      firstName: "",
      gender: "other",
      birthday: "",
      phoneNumber: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    setApiError(null);

    try {
      const response = await fetch("/api/proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          // API Routeに転送先エンドポイントを伝える
          endPoint: "/api/users/auth/signup/",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "登録に失敗しました。");
      }

      alert("登録が完了しました。");
      // ログインページなどにリダイレクト
      router.push("/login");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "不明なエラーが発生しました。";
      setApiError(errorMessage);
      console.error("Signup failed:", error);
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
          新規アカウント登録
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3, width: "100%" }}
        >
          <Grid container spacing={2}>
            {apiError && (
              <Grid>
                <Alert severity="error">{apiError}</Alert>
              </Grid>
            )}
            <Grid>
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
            </Grid>
            <Grid>
              <TextField
                {...register("lastName")}
                required
                fullWidth
                id="lastName"
                label="姓"
                name="lastName"
                autoComplete="family-name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>
            <Grid>
              <TextField
                {...register("firstName")}
                required
                fullWidth
                id="firstName"
                label="名"
                name="firstName"
                autoComplete="given-name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid>
              <TextField
                {...register("gender")}
                required
                fullWidth
                select
                id="gender"
                name="gender"
                label="性別"
                defaultValue=""
                error={!!errors.gender}
                helperText={errors.gender?.message}
              >
                <MenuItem value="male">男性</MenuItem>
                <MenuItem value="female">女性</MenuItem>
                <MenuItem value="other">その他</MenuItem>
              </TextField>
            </Grid>
            <Grid>
              <TextField
                {...register("birthday")}
                required
                fullWidth
                id="birthday"
                name="birthday"
                label="誕生日"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
              />
            </Grid>
            <Grid>
              <TextField
                {...register("phoneNumber")}
                required
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="携帯電話番号"
                type="tel"
                autoComplete="tel"
                placeholder="090-1234-5678"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            </Grid>
            <Grid>
              <TextField
                {...register("address")}
                required
                fullWidth
                id="address"
                name="address"
                label="住所"
                autoComplete="street-address"
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
          </Grid>
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            登録する
          </LoadingButton>
        </Box>
      </Paper>
    </Container>
  );
}


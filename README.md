# Schedule - Premium Calendar App for Windows

Windows 向けの高機能・高意匠なカレンダー表示型スケジュール管理アプリケーションです。
Tauri v2 を基盤とし、Google カレンダーとの連携、ローカル保存、および天気予報に連動したダイナミックなデザインを特徴とします。

## 主な機能 (Implemented)

- **Premium UI (Glassmorphism)**: 半透明のぼかし効果と現代的なタイポグラフィを採用した洗練されたデザイン。
- **Dynamic Weather Background**: 現在の天気に合わせ、背景のグラデーションや雨・雪などのアニメーションエフェクトが変化。
- **Responsive Calendar**: 正確な日付計算に基づいた月間カレンダー表示。
- **Local Cache**: localStorage を用いた暫定的なイベント保存機能。

## 技術スタック (Tech Stack)

- **Framework**: [Tauri v2](https://v2.tauri.app/) (Rust + Vite + React)
- **Styling**: Vanilla CSS (Modern CSS 3)
- **Icons**: Lucide React
- **Architecture**: **MVVM + Repository パターン**
  - **Model**: `src/states/ScheduleUiState.ts`
  - **View**: `src/App.tsx` & `src/components/`
  - **ViewModel**: `src/viewmodels/ScheduleViewModel.ts`
  - **Repository**: `src/repositories/CalendarRepository.ts`

## セットアップ (Setup)

### 依存関係のインストール
```bash
npm install
```

### 開発モード (Browser)
```bash
npm run dev
```

### 開発モード (Tauri / Windows App)
```bash
npm run tauri dev
```

### ビルド
```bash
npm run build
npx tauri build
```

## ドキュメント (Internal Docs)

- [DATA_FLOW.md](./DATA_FLOW.md): システムの真実（設計構造）
- [AGENTS.md](./AGENTS.md): エージェントガバナンス
- [ORBIT.md](./ORBIT.md): Orbit オーケストレーター連携情報

## 開発ルール (Governance)

本プロジェクトは **Antigravity AI Agent** によって開発・管理されています。
全てのロジックは `DATA_FLOW.md` の定義に基づき、MVVM アーキテクチャを厳守して実装されます。

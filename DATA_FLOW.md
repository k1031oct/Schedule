# DATA_FLOW for Schedule

## システム構造 (Architecture)
└─ src/
   ├─ states/
   │  └─ ScheduleUiState (型定義、初期状態、UI用の列挙型)
   ├─ viewmodels/
   │  └─ ScheduleViewModel (イベント操作、Google Auth 制御、天気更新ロジック)
   ├─ repositories/
   │  └─ CalendarRepository (Google Calendar API、Local SQLite/Storage との通信)
   └─ components/
      ├─ Calendar (日付グリッド表示、イベント描画)
      ├─ WeatherBackground (天気に応じた動的デザイン制御)
      └─ Sidebar (Google Login、今日のタスク表示)

## データフロー (Data Flow)
1. **初期化**:
   - `ScheduleViewModel` が起動時に `CalendarRepository` からローカルに保存されたスケジュールを取得。
   - `ScheduleUiState` を更新し、`Calendar` コンポーネントに反映。
2. **Google同期**:
   - ユーザーが「Login with Google」をクリック。
   - `ScheduleViewModel` が OAuth フローを開始し、トークンを取得。
   - `CalendarRepository` が Google API からイベントを取得し、ローカル DB を更新。
3. **天気連動**:
   - `ScheduleViewModel` が定期的に天気 API から情報を取得。
   - `ScheduleUiState.weather` を更新。
   - `WeatherBackground` がステータスに応じて CSS グラデーション/アニメーションを変更。

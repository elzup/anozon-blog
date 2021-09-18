---
title: Firebase Project の複製や ID 変更
date: 2020-07-26 22:00:00
topics:
  - Firebase
  - GCP
type: tech
published: true
---

```toc

```

## やること

プロジェクトの複製には、

- 移行先プロジェクト作成
- ソースコードの ID 変更
- 移行元を Blaze Plan にする(なってない場合)
- Firestore のデータ移行

が必要になります。
Firestore のデータ移行を中心にやってみた記録を残しておきます。

## ソースコードの ID 変更

デプロイに関しては基本 `.firebaserc` を変えるだけで済みそう。

## Firestore のデータ移行

移行元のプロジェクト ID を `old_name`、新規プロジェクト ID を `new_name` として説明します。

[データのエクスポートとインポート  \|  Firebase](https://firebase.google.com/docs/firestore/manage-data/export-import?hl=ja) にそって行います。

[ストレージ ブラウザ – Storage – scoreform – Google Cloud Platform](https://console.cloud.google.com/storage/browser) でデータ用のバケットを作成。

`gsutil のリンク` をメモします。
(例: `gs://old_name-backup`)

```sh
# 移行元プロジェクトに切り替え
$ gcloud config set project old_name
# Bucket に export する
$ gcloud firestore export gs://old_name-backup
```

export された フォルダ名をメモします。
(例: `/2020-07-26T13:00:29_42888`)

```sh
# 新プロジェクト切り替え
$ gcloud config set project new_name

# new_name のサービスアカウントに bucket の権限付与
$ gsutil iam ch serviceAccount:{new project name}@appspot.gserviceaccount.com:admin gs://old_name-backup

# Bucket から 新Firestore に import
$ gcloud firestore import gs://old_name-backup/2020-07-26T13:00:29_42888
```

以上の手順で移行できました。

移行元と移行先の Firestore で region が違う場合は、import 時か export 時にエラーが出てしまいます。
その場合、2 つの region の Bucket を用意してデータを移動することで import できることも確認できました。

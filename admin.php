<?php
session_start();

// ============================================
// CONFIGURATION DE SÉCURITÉ
// ============================================
$mot_de_passe_admin = 'avocado2026'; // Nouveau mot de passe
$tentatives_max = 5;
$temps_blocage = 900; // 15 secondes (pour test) → en production mettre 900 (15 min)

// Code secret stocké dans un fichier
$code_secret_path = 'secret.txt';
$code_secret = file_exists($code_secret_path) ? trim(file_get_contents($code_secret_path)) : 'AFRO-SECRET-2026';

// ---- Limitation des tentatives ----
if (!isset($_SESSION['tentatives'])) {
    $_SESSION['tentatives'] = 0;
    $_SESSION['derniere_tentative'] = time();
}

if ($_SESSION['tentatives'] >= $tentatives_max && (time() - $_SESSION['derniere_tentative']) < $temps_blocage) {
    die('❌ Trop de tentatives. Réessayez dans ' . ceil(($temps_blocage - (time() - $_SESSION['derniere_tentative'])) / 60) . ' minutes.');
}

// ---- Vérification de la connexion ----
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['mot_de_passe']) && isset($_POST['code_secret'])) {
    if ($_POST['mot_de_passe'] === $mot_de_passe_admin && $_POST['code_secret'] === $code_secret) {
        $_SESSION['admin_authentifie'] = true;
        $_SESSION['tentatives'] = 0;
        header('Location: admin.php');
        exit;
    } else {
        $_SESSION['tentatives']++;
        $_SESSION['derniere_tentative'] = time();
        $erreur_auth = '❌ Mot de passe ou code secret incorrect. Tentative ' . $_SESSION['tentatives'] . '/' . $tentatives_max;
    }
}

// ---- Si non authentifié, afficher le formulaire de login ----
if (!isset($_SESSION['admin_authentifie']) || $_SESSION['admin_authentifie'] !== true) {
    ?>
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Administration - Afro Glow</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@400;600&display=swap" rel="stylesheet">
        <style>
            * { margin:0; padding:0; box-sizing:border-box; }
            body {
                font-family: 'Montserrat', sans-serif;
                background: #fcf9f7;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                padding: 20px;
            }
            .login-box {
                background: white;
                padding: 40px 35px;
                border-radius: 16px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.06);
                width: 100%;
                max-width: 400px;
                border: 1px solid rgba(212,175,136,0.1);
            }
            .login-box .logo-icon {
                text-align: center;
                font-size: 40px;
                color: #D4AF88;
                margin-bottom: 8px;
            }
            .login-box h1 {
                font-family: 'Playfair Display', serif;
                color: #2c2c2c;
                font-size: 26px;
                text-align: center;
                margin-bottom: 4px;
            }
            .login-box .sub {
                color: #a59b91;
                text-align: center;
                font-size: 14px;
                margin-bottom: 25px;
            }
            .login-box input {
                width: 100%;
                padding: 14px 18px;
                border: 1px solid #e8e0d8;
                border-radius: 10px;
                font-size: 15px;
                font-family: 'Montserrat', sans-serif;
                margin-bottom: 16px;
                background: #fcf9f7;
                transition: border 0.3s;
            }
            .login-box input:focus {
                outline: none;
                border-color: #D4AF88;
            }
            .login-box button {
                width: 100%;
                padding: 14px;
                background: #D4AF88;
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background 0.3s;
                font-family: 'Montserrat', sans-serif;
            }
            .login-box button:hover {
                background: #c49a6e;
            }
            .erreur {
                color: #e74c3c;
                text-align: center;
                margin-bottom: 16px;
                font-size: 14px;
            }
            .login-box .securite-info {
                text-align: center;
                font-size: 12px;
                color: #a59b91;
                margin-top: 14px;
            }
            @media (max-width: 480px) {
                .login-box {
                    padding: 30px 20px;
                }
                .login-box h1 {
                    font-size: 22px;
                }
                .login-box input, .login-box button {
                    font-size: 14px;
                    padding: 12px 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="login-box">
            <div class="logo-icon">✦</div>
            <h1>Afro Glow</h1>
            <p class="sub">Administration sécurisée</p>
            <?php if (isset($erreur_auth)): ?>
                <p class="erreur"><?= htmlspecialchars($erreur_auth) ?></p>
            <?php endif; ?>
            <form method="POST">
                <input type="password" name="mot_de_passe" placeholder="Mot de passe" required autofocus>
                <input type="text" name="code_secret" placeholder="Code secret" required>
                <button type="submit">Se connecter</button>
                <p class="securite-info">🔒 Double authentification • Protection anti-intrusion</p>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// ============================================
// CONNEXION À LA BASE
// ============================================
require_once 'config.php';

// ============================================
// TRAITEMENTS DES FORMULAIRES (CRUD)
// ============================================

// ---- AJOUTER UN PRODUIT ----
if (isset($_POST['action']) && $_POST['action'] === 'ajouter_produit') {
    $nom = trim($_POST['nom']);
    $prix = floatval($_POST['prix']);
    $prix_barre = !empty($_POST['prix_barre']) ? floatval($_POST['prix_barre']) : null;
    $categorie = trim($_POST['categorie']);
    $description = trim($_POST['description']);
    
    $image = '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $ext;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $upload_dir . $filename)) {
            $image = $filename;
        }
    }
    if (!empty($nom) && !empty($prix) && !empty($image)) {
        $stmt = $pdo->prepare('INSERT INTO produits (nom, prix, prix_barre, categorie, description, image) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([$nom, $prix, $prix_barre, $categorie, $description, $image]);
        header('Location: admin.php?success=produit_ajoute');
        exit;
    }
}

// ---- SUPPRIMER UN PRODUIT ----
if (isset($_GET['supprimer_produit'])) {
    $id = intval($_GET['supprimer_produit']);
    $stmt = $pdo->prepare('SELECT image FROM produits WHERE id = ?');
    $stmt->execute([$id]);
    $produit = $stmt->fetch();
    if ($produit && !empty($produit['image'])) {
        $chemin = 'uploads/' . $produit['image'];
        if (file_exists($chemin)) unlink($chemin);
    }
    $stmt = $pdo->prepare('DELETE FROM produits WHERE id = ?');
    $stmt->execute([$id]);
    header('Location: admin.php?success=produit_supprime');
    exit;
}

// ---- MODIFIER UN PRODUIT ----
if (isset($_POST['action']) && $_POST['action'] === 'modifier_produit') {
    $id = intval($_POST['id']);
    $nom = trim($_POST['nom']);
    $prix = floatval($_POST['prix']);
    $prix_barre = !empty($_POST['prix_barre']) ? floatval($_POST['prix_barre']) : null;
    $categorie = trim($_POST['categorie']);
    $description = trim($_POST['description']);
    
    $image = $_POST['image_actuelle'] ?? '';
    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $upload_dir = 'uploads/';
        if (!is_dir($upload_dir)) mkdir($upload_dir, 0755, true);
        $ext = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $ext;
        if (move_uploaded_file($_FILES['image']['tmp_name'], $upload_dir . $filename)) {
            if (!empty($image) && file_exists($upload_dir . $image)) {
                unlink($upload_dir . $image);
            }
            $image = $filename;
        }
    }
    
    if (!empty($nom) && !empty($prix) && !empty($image)) {
        $stmt = $pdo->prepare('UPDATE produits SET nom=?, prix=?, prix_barre=?, categorie=?, description=?, image=? WHERE id=?');
        $stmt->execute([$nom, $prix, $prix_barre, $categorie, $description, $image, $id]);
        header('Location: admin.php?success=produit_modifie');
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration - Afro Glow</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* ===== STYLES GÉNÉRAUX ===== */
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
            font-family: 'Montserrat', sans-serif;
            background: #fcf9f7;
            color: #2c2c2c;
        }
        .admin-wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px 20px 60px;
        }

        /* ===== HEADER ===== */
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e8e0d8;
            flex-wrap: wrap;
            gap: 15px;
        }
        .admin-header h1 {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
        }
        .admin-header .logout {
            color: #a59b91;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 20px;
            border: 1px solid #e8e0d8;
            border-radius: 8px;
            transition: 0.3s;
        }
        .admin-header .logout:hover {
            background: #f5f0eb;
            color: #2c2c2c;
        }

        /* ===== CARTES ===== */
        .card {
            background: white;
            border-radius: 16px;
            padding: 28px 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.04);
            border: 1px solid rgba(212,175,136,0.08);
        }
        .card h3 {
            font-size: 18px;
            margin-bottom: 18px;
            font-weight: 600;
        }

        /* ===== FORMULAIRES ===== */
        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }
        .form-grid input,
        .form-grid select,
        .form-grid textarea {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #e8e0d8;
            border-radius: 10px;
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            background: #fcf9f7;
            transition: border 0.3s;
        }
        .form-grid input:focus,
        .form-grid select:focus,
        .form-grid textarea:focus {
            outline: none;
            border-color: #D4AF88;
        }
        .form-grid textarea {
            grid-column: span 2;
            resize: vertical;
        }
        .form-grid input[type="file"] {
            grid-column: span 2;
            padding: 10px;
            background: white;
        }
        .full-width {
            grid-column: span 2;
        }
        .btn-primary {
            padding: 12px 32px;
            background: #D4AF88;
            color: white;
            border: none;
            border-radius: 10px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            transition: background 0.3s;
            font-family: 'Montserrat', sans-serif;
        }
        .btn-primary:hover {
            background: #c49a6e;
        }

        /* ===== TABLEAUX ===== */
        .table-wrap {
            overflow-x: auto;
        }
        .admin-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }
        .admin-table th {
            text-align: left;
            padding: 12px 16px;
            background: #fcf9f7;
            color: #a59b91;
            font-weight: 600;
            border-bottom: 2px solid #e8e0d8;
        }
        .admin-table td {
            padding: 12px 16px;
            border-bottom: 1px solid #f0ebe6;
            vertical-align: middle;
        }
        .admin-table tr:hover td {
            background: #fcf9f7;
        }
        .admin-table img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 6px;
        }
        .action-link {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 6px;
            text-decoration: none;
            font-size: 14px;
        }
        .action-edit {
            color: #D4AF88;
            background: rgba(212,175,136,0.08);
        }
        .action-edit:hover {
            background: rgba(212,175,136,0.2);
        }
        .action-delete {
            color: #e74c3c;
            background: rgba(231,76,60,0.08);
        }
        .action-delete:hover {
            background: rgba(231,76,60,0.2);
        }

        /* ===== ALERTES ===== */
        .alert-success {
            background: #d4edda;
            color: #155724;
            padding: 14px 20px;
            border-radius: 10px;
            margin-bottom: 25px;
            font-weight: 500;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
            .admin-wrap {
                padding: 20px 12px 40px;
            }
            .admin-header {
                flex-direction: column;
                align-items: stretch;
                text-align: center;
            }
            .admin-header h1 {
                font-size: 22px;
            }
            .admin-header .logout {
                text-align: center;
            }
            .form-grid {
                grid-template-columns: 1fr;
            }
            .form-grid textarea,
            .form-grid input[type="file"] {
                grid-column: span 1;
            }
            .full-width {
                grid-column: span 1;
            }
            .card {
                padding: 20px 16px;
            }
            .card h3 {
                font-size: 16px;
            }
            .admin-table {
                font-size: 12px;
            }
            .admin-table th,
            .admin-table td {
                padding: 8px 10px;
            }
            .admin-table img {
                width: 40px;
                height: 40px;
            }
            .action-link {
                font-size: 12px;
                padding: 3px 8px;
            }
        }

        @media (max-width: 480px) {
            .admin-header h1 {
                font-size: 18px;
            }
            .admin-header .logout {
                font-size: 13px;
                padding: 6px 14px;
            }
            .card {
                padding: 16px 12px;
            }
            .form-grid input,
            .form-grid select,
            .form-grid textarea {
                font-size: 13px;
                padding: 10px 12px;
            }
            .btn-primary {
                font-size: 13px;
                padding: 10px 20px;
            }
            .admin-table {
                font-size: 11px;
            }
            .admin-table th,
            .admin-table td {
                padding: 6px 8px;
            }
        }
    </style>
</head>
<body>
<div class="admin-wrap">

    <!-- HEADER -->
    <div class="admin-header">
        <h1>✦ Administration Afro Glow</h1>
        <a href="admin.php?deconnexion=1" class="logout">Déconnexion</a>
    </div>

    <?php if (isset($_GET['deconnexion'])): ?>
        <?php session_destroy(); ?>
        <meta http-equiv="refresh" content="0;url=admin.php">
    <?php endif; ?>

    <?php if (isset($_GET['success'])): ?>
        <div class="alert-success">
            <?php
            $msg = [
                'produit_ajoute' => '✅ Produit ajouté avec succès !',
                'produit_supprime' => '✅ Produit supprimé avec succès !',
                'produit_modifie' => '✅ Produit modifié avec succès !',
            ];
            echo $msg[$_GET['success']] ?? '✅ Action réussie !';
            ?>
        </div>
    <?php endif; ?>

    <!-- ===== AJOUTER UN PRODUIT ===== -->
    <div class="card">
        <h3>➕ Ajouter un produit sur le site</h3>
        <form method="POST" enctype="multipart/form-data">
            <input type="hidden" name="action" value="ajouter_produit">
            <div class="form-grid">
                <input type="text" name="nom" placeholder="Nom du produit" required>
                <input type="text" name="categorie" placeholder="Catégorie (ex: soins)" required>
                <input type="number" name="prix" placeholder="Prix" step="0.01" required>
                <input type="number" name="prix_barre" placeholder="Prix barré (optionnel)" step="0.01">
                <textarea name="description" placeholder="Description du produit" rows="3"></textarea>
                <input type="file" name="image" accept="image/*" required>
                <button type="submit" class="btn-primary full-width">Ajouter le produit</button>
            </div>
        </form>
    </div>
    <!-- ===== LISTE DES PRODUITS ===== -->
    <div class="card">
        <h3>📋 Produits existants</h3>
        <?php
        $stmt = $pdo->query('SELECT * FROM produits ORDER BY id DESC');
        $produits = $stmt->fetchAll();
        if (count($produits) > 0):
        ?>
        <div class="table-wrap">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Catégorie</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($produits as $p): ?>
                    <tr>
                        <td><img src="uploads/<?= $p['image'] ?>" alt=""></td>
                        <td><?= htmlspecialchars($p['nom']) ?></td>
                        <td><?= number_format($p['prix'], 2) ?> $</td>
                        <td><?= htmlspecialchars($p['categorie']) ?></td>
                        <td>
                            <a href="?modifier_produit=<?= $p['id'] ?>" class="action-link action-edit">✏️</a>
                            <a href="?supprimer_produit=<?= $p['id'] ?>" class="action-link action-delete" onclick="return confirm('Supprimer ce produit ?')">🗑️</a>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php else: ?>
            <p style="color:#a59b91;">Aucun produit pour le moment.</p>
        <?php endif; ?>
    </div>

    <?php
    // ---- FORMULAIRE DE MODIFICATION ----
    if (isset($_GET['modifier_produit'])):
        $id_modif = intval($_GET['modifier_produit']);
        $stmt = $pdo->prepare('SELECT * FROM produits WHERE id = ?');
        $stmt->execute([$id_modif]);
        $produit_modif = $stmt->fetch();
        if ($produit_modif):
    ?>
    <div class="card" style="border-color:#D4AF88;">
        <h3>✏️ Modifier le produit</h3>
        <form method="POST" enctype="multipart/form-data">
            <input type="hidden" name="action" value="modifier_produit">
            <input type="hidden" name="id" value="<?= $produit_modif['id'] ?>">
            <input type="hidden" name="image_actuelle" value="<?= $produit_modif['image'] ?>">
            <div class="form-grid">
                <input type="text" name="nom" value="<?= htmlspecialchars($produit_modif['nom']) ?>" required>
                <input type="text" name="categorie" value="<?= htmlspecialchars($produit_modif['categorie']) ?>" required>
                <input type="number" name="prix" value="<?= $produit_modif['prix'] ?>" step="0.01" required>
                <input type="number" name="prix_barre" value="<?= $produit_modif['prix_barre'] ?>" step="0.01" placeholder="Prix barré">
                <textarea name="description" rows="3"><?= htmlspecialchars($produit_modif['description']) ?></textarea>
                <div>
                    <p style="font-size:13px; color:#a59b91; margin-bottom:6px;">Image actuelle :</p>
                    <img src="uploads/<?= $produit_modif['image'] ?>" style="width:80px; height:80px; object-fit:cover; border-radius:8px; margin-bottom:10px;">
                    <input type="file" name="image" accept="image/*">
                    <p style="font-size:12px; color:#a59b91; margin-top:4px;">Laissez vide pour garder l'image actuelle.</p>
                </div>
                <button type="submit" class="btn-primary full-width">Modifier le produit</button>
            </div>
        </form>
    </div>
    <?php
        endif;
    endif;
    ?>

</div>
</body>
</html>